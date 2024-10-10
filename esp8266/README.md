# ESP8266 Capteur de Température et d'Humidité avec Configuration Wi-Fi

## Contexte

Ce projet utilise un module ESP8266 pour mesurer la température, l'humidité de l'air (via un capteur DHT22) et l'humidité du sol. 
Cette carte est connectée au serveur mère lui fournissant les données.

### Fonctionnalités principales :
- Connexion au réseau Wi-Fi pour envoyer les données de capteurs.
- Possibilité de configurer le réseau Wi-Fi via un point d'accès si aucune configuration n'est disponible.
- Interface web pour la configuration.

## Matériel requis
- ESP8266 (NodeMCU ou équivalent)
- Capteur de température et d'humidité DHT22
- Capteur d'humidité du sol (Capacitive Soil Moisture Sensor V1.2)

## Installation d'Arduino IDE

1. Téléchargez et installez l'Arduino IDE depuis le site officiel : https://www.arduino.cc/en/software
2. Installez le gestionnaire de cartes pour ESP8266 dans l'IDE Arduino.
   - Allez dans **Fichier > Préférences**.
   - Ajoutez cette URL dans le champ "URL du gestionnaire de cartes supplémentaires" : `http://arduino.esp8266.com/stable/package_esp8266com_index.json`
   - Ensuite, allez dans **Outils > Type de carte > Gestionnaire de cartes**, recherchez "ESP8266" et installez la dernière version.

## Librairies nécessaires

Pour utiliser ce code, vous devez installer les librairies suivantes via le **Gestionnaire de Bibliothèques** dans Arduino IDE :
1. **ESP8266WiFi** (déjà incluse avec l'installation du module ESP8266)
2. **ESP8266WebServer** (incluse avec l'ESP8266)
3. **DHT Sensor Library** de `Adafruit`
4. **ArduinoJson**
5. **EEPROM** (pour sauvegarder les informations Wi-Fi)

## Schéma de câblage

- **DHT22** :
  - VCC → 3.3V 
  - GND → GND 
  - Data → D4 

- **Capteur d'humidité du sol** :
  - VCC → 3.3V 
  - GND → GND 
  - Data → A0 

## Utilisation

1. **Configuration Wi-Fi** :
   - Lors de la première utilisation (ou après un reset de l'EEPROM), le module démarre un point d'accès nommé `ESP8266_Config` avec le mot de passe `password`.
   - Connectez-vous au point d'accès avec votre appareil, puis accédez à l'URL `http://192.168.4.1/` pour ouvrir la page de configuration.
   - Entrez le SSID et le mot de passe de votre réseau Wi-Fi ainsi qu'un nom pour votre carte, puis appuyez sur "Sauvegarder". La carte redémarrera et se connectera à votre réseau.

2. **Consultation des données** :
   - Une fois connecté à votre réseau Wi-Fi, accédez à l'adresse IP attribuée à votre ESP8266 (affichée dans le moniteur série) pour consulter les données des capteurs via l'URL `/data`.
   - Les données sont renvoyées au format JSON et incluent la température, l'humidité de l'air et l'humidité du sol.

### Exemple de réponse JSON
```json
{
  "temperature": 23.5,
  "humidity": 45.3,
  "soilHumidity": 70,
  "espName": "Cocotier"
}