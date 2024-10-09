
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <DHT.h>
#include <ArduinoJson.h>

// Définissez le SSID et le mot de passe de votre réseau WiFi
const char* ssid = "enibar";
const char* password = "BarYcentre-gravite";

#define DHTPIN D4      // Pin de la NodeMCU où le capteur DHT22 est connecté
#define DHTTYPE DHT22  // Définir le type du capteur (DHT22)

#define SOIL_MOISTURE_PIN A0

DHT dht(DHTPIN, DHTTYPE); // Initialisation du capteur

ESP8266WebServer server(80);

void setup() {
  // Initialisez la communication série pour le débogage
  Serial.begin(9600);

  Serial.println("Recherche des réseaux WiFi disponibles...");
  
  // Démarre l'analyse WiFi
  int numNetworks = WiFi.scanNetworks();
  
  if (numNetworks == 0) {
    Serial.println("Aucun réseau WiFi trouvé.");
  } else {
    Serial.println("Réseaux WiFi disponibles :");
    for (int i = 0; i < numNetworks; i++) {
      Serial.print(i + 1);
      Serial.print(": ");
      Serial.print(WiFi.SSID(i));
      Serial.print(" (Signal: ");
      Serial.print(WiFi.RSSI(i));
      Serial.println(" dBm)");
    }
  }
  
  // Efface les résultats de l'analyse WiFi
  WiFi.scanDelete();
  
  // Commencez la connexion WiFi
  WiFi.begin(ssid, password);
  Serial.println("Connexion au WiFi");

  // Attendez jusqu'à ce que la connexion soit établie
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  // Connexion réussie
  Serial.println("");
  Serial.println("WiFi connecté");
  Serial.println("Adresse IP : ");
  Serial.println(WiFi.localIP());

  dht.begin();

  server.on("/data", handleDataRequest);

  // Démarrez le serveur
  server.begin();
  Serial.println("Serveur démarré");
}

void loop() {
  server.handleClient();
}


void handleDataRequest() {
  // Lire la température et l'humidité
  float temperature = dht.readTemperature();  // Température en Celsius
  float humidity = dht.readHumidity();        // Humidité en pourcentage

  int soilMoistureValue = analogRead(SOIL_MOISTURE_PIN);
  float soilHumidity = map(soilMoistureValue, 1023, 0, 0, 100);  // 0% sec, 100% humide

  // Vérifiez si les lectures sont valides
  if (isnan(temperature) || isnan(humidity)) {
    server.send(500, "application/json", "{\"error\":\"Erreur de lecture du capteur DHT\"}");
    return;
  }

  // Créer un objet JSON pour stocker les données
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["temperature"] = temperature;
  jsonDoc["humidity"] = humidity;
  jsonDoc["soilHumidity"] = soilHumidity;

  // Convertir l'objet JSON en chaîne
  String jsonString;
  serializeJson(jsonDoc, jsonString);

  // Envoyer la réponse JSON
  server.send(200, "application/json", jsonString);
}
