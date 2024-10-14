#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <DHT.h>
#include <ArduinoJson.h>
#include <ESP8266HTTPClient.h>
#include <EEPROM.h>  // Pour stocker la configuration Wi-Fi

// Définir le DHT22 et le capteur d'humidité du sol
#define DHTPIN D4
#define DHTTYPE DHT22
#define SOIL_MOISTURE_PIN A0

DHT dht(DHTPIN, DHTTYPE);

// Créer un serveur web
ESP8266WebServer server(80);

// Stocker le SSID et le mot de passe dans l'EEPROM
struct {
  char ssid[32];
  char password[32];
  char deviceName[32];
  char serverIp[32];
} wifiConfig;

int retryWifi = 0;
int retryHttpPost = 0;

void setup() {
  // Initialiser la communication série
  Serial.begin(9600);

  // Initialiser l'EEPROM
  EEPROM.begin(512);

  // Lire la configuration Wi-Fi stockée
  EEPROM.get(0, wifiConfig);

  // Si aucun SSID n'est stocké, démarrer le point d'accès
  Serial.println("");
  Serial.print("SSID : ");
  Serial.print(wifiConfig.ssid),
    Serial.println("");
  Serial.print("Password : ");
  Serial.print(wifiConfig.password);
  Serial.println("");

  if (strlen(wifiConfig.ssid) == 0) {
    startAccessPoint();
  } else {
    // Tentative de connexion au réseau Wi-Fi configuré
    connectToWiFi(wifiConfig.ssid, wifiConfig.password);
  }

  dht.begin();  // Initialisation du capteur DHT
}

void loop() {
  server.handleClient();
}

// Démarrer un point d'accès pour configurer le Wi-Fi
void startAccessPoint() {
  Serial.println("Démarrage du point d'accès...");
  WiFi.softAP("ESP8266_Config", "password");  // Nom et mot de passe du point d'accès

  // Adresse IP du point d'accès
  Serial.println(WiFi.softAPIP());

  // Page pour entrer les informations Wi-Fi
  server.on("/", []() {
    server.send(200, "text/html", R"(
      <!DOCTYPE html>
      <html>
        <body>
          <h2>Configuration WiFi</h2>
          <form action="/config" method="POST">
            SSID Wi-Fi:<br>
            <input type="text" name="ssid"><br>
            Mot de passe Wi-Fi:<br>
            <input type="text" name="password"><br>
            Nom de la carte:<br>
            <input type="text" name="deviceName"><br>
            Ip du serveur:<br>
            <input type="text" name="serverIp"><br><br>
            <input type="submit" value="Sauvegarder">
          </form>
        </body>
      </html>
    )");
  });

  // Traiter les données du formulaire
  server.on("/config", []() {
    String ssid = server.arg("ssid");
    String password = server.arg("password");
    String deviceName = server.arg("deviceName");
    String serverIp = server.arg("serverIp");

    // Sauvegarder la configuration dans l'EEPROM
    ssid.toCharArray(wifiConfig.ssid, 32);
    password.toCharArray(wifiConfig.password, 32);
    deviceName.toCharArray(wifiConfig.deviceName, 32);
    serverIp.toCharArray(wifiConfig.serverIp, 32);

    EEPROM.put(0, wifiConfig);
    EEPROM.commit();

    server.send(200, "text/html", "Configuration OK. Nouvelle configuration en cours...");

    delay(3000);
    ESP.restart();  // Redémarrer pour appliquer la configuration
  });

  // Démarrer le serveur
  server.begin();
}

// Se connecter au Wi-Fi
void connectToWiFi(const char* ssid, const char* password) {
  Serial.println("Connexion au WiFi...");
  WiFi.begin(ssid, password);

  // Attendre la connexion
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
    retryWifi = retryWifi + 1;
    if (retryWifi == 10) {
      Serial.println("Connexion impossible : reset carte");
      for (int i = 0; i < 512; i++) {
        EEPROM.write(i, 0);  // Écrire 0 dans chaque byte de l'EEPROM
      }
      EEPROM.commit();
      ESP.restart();
    }
  }

  Serial.println("Connecté au Wi-Fi !");

  // Send HTTP post to serverIP:8081/config
  sendIpToServer();

  server.on("/data", handleDataRequest);

  // Démarrer le serveur
  server.begin();
}

// Fonction pour gérer les requêtes /data et renvoyer la température, l'humidité et l'humidité du sol
void handleDataRequest() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int soilMoistureValue = analogRead(SOIL_MOISTURE_PIN);
  float soilHumidity = map(soilMoistureValue, 1023, 0, 0, 100);  // Humidité en pourcentage

  if (isnan(temperature) || isnan(humidity) || isnan(soilHumidity)) {
    server.send(500, "application/json", "{\"error\":\"Erreur de lecture du capteur DHT\"}");
    return;
  }

  StaticJsonDocument<200> jsonDoc;
  jsonDoc["temperature"] = temperature;
  jsonDoc["humidity"] = humidity;
  jsonDoc["soilHumidity"] = soilHumidity;
  jsonDoc["espName"] = wifiConfig.deviceName;


  String jsonString;
  serializeJson(jsonDoc, jsonString);
  server.send(200, "application/json", jsonString);
}

void sendIpToServer() {
  if (WiFi.status() == WL_CONNECTED) {  // Vérifier si la connexion Wi-Fi est active
    HTTPClient http;
    WiFiClient client;

    // Construire l'URL du serveur
    String serverUrl = String("http://") + wifiConfig.serverIp + ":8081/config";

    // Initialiser la requête HTTP
    http.begin(client, serverUrl);
    http.addHeader("Content-Type", "application/json");

    // Récupérer l'IP locale attribuée par le routeur
    String localIp = WiFi.localIP().toString();

    // Créer un document JSON
    StaticJsonDocument<200> jsonDoc;
    jsonDoc["localIp"] = localIp;                // Ajouter l'IP de l'ESP au JSON
    jsonDoc["espName"] = wifiConfig.deviceName;  // Nom de l'ESP si besoin

    // Convertir le document JSON en string
    String jsonString;
    serializeJson(jsonDoc, jsonString);

    // Envoyer la requête POST avec le JSON
    delay(10000);
    int httpResponseCode = http.POST(jsonString);

    // Vérifier la réponse du serveur
    if (httpResponseCode > 0) {
      String response = http.getString();  // Réponse du serveur
      Serial.println("Réponse du serveur: " + response);
    } else {
      delay(1000);
      Serial.println("Connexion serveur distant impossible");
      Serial.println("Erreur lors de l'envoi :" + String(httpResponseCode));
      while (httpResponseCode < 0) {
        httpResponseCode = http.POST(jsonString);
        retryHttpPost = retryHttpPost + 1;
        if (retryHttpPost == 10) {
          Serial.println("Connexion impossible : Reset carte");
          for (int i = 0; i < 512; i++) {
            EEPROM.write(i, 0);  // Écrire 0 dans chaque byte de l'EEPROM
          }
          EEPROM.commit();
          ESP.restart();
        }
      }

      // Fermer la connexion HTTP
      http.end();
    }
  }
}
