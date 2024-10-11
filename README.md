# 🌱 Plant Surveillance System 🌱

## Description

Bienvenue dans l'application **Plant Surveillance System** ! Ce projet vous permet de surveiller à distance vos plantes grâce à des capteurs connectés (ESP8266). L'application offre une interface simple et intuitive pour afficher les données de vos plantes, telles que l'humidité du sol, la température, et l'humidité de l'air. Parfait pour tous les amoureux de plantes souhaitant s'assurer de la bonne santé de leur jardin, même à distance !

### 🛠️ Technologies Utilisées
- **React** : Pour l'interface utilisateur.
- **Node.js** : Pour le back-end qui gère les communications entre les capteurs et l'application.
- **ESP8266** : Pour les capteurs sans fil qui surveillent les plantes et envoient les données au serveur.
  
## 🐳 Installation via Docker Compose

### Prérequis
Avant de commencer, assurez-vous d'avoir installé [Docker](https://www.docker.com/get-started) et [Docker Compose](https://docs.docker.com/compose/install/) sur votre machine.

### Étapes d'installation

1. **Clonez le dépôt** :
   ```bash
   git clone https://github.com/LouisRuelle04/green-enib.git
   cd plant-surveillance-system
2. Lancez les services avec Docker Compose :
    ```bash
    docker-compose up -d

Cette commande va :

- Construire et lancer le front-end React.
- Construire et lancer le back-end Node.js.
- Construire et lancer la base de données.

3. Accédez à l'application :
Une fois les conteneurs lancés, ouvrez votre navigateur à l'adresse suivante :
    ```bash
    http://localhost/

4. Configuration des Capteurs (ESP8266) :

- Suivez les instructions sur l'interface pour connecter les capteurs à votre réseau Wi-Fi.
- Assurez-vous que les capteurs sont correctement configurés pour envoyer des données au back-end via HTTP.

## 👩‍💻 Manuel Utilisateur

### 🌿 Utilisation de l'Application

1. Page d'accueil : 
- Vous trouverez un tableau de bord qui affiche les plantes que vous surveillez, ainsi que leurs paramètres de santé actuels (température, humidité du sol, humidité de l'air).

2. Ajouter une nouvelle plante :
- Cliquez sur le bouton "Ajouter une plante" et entrez les informations requises.
- Associez les capteurs disponibles à cette nouvelle plante.

3. Consultation des données :
- Accédez aux données de chaque plante individuellement en cliquant sur son nom. Vous pourrez y voir les graphiques des données environnementales mesurées dans le temps.

4. Alertes et Notifications :
- Configurez des alertes pour recevoir des notifications lorsque l'humidité du sol ou la température dépasse des seuils critiques.

### 🚀 Fonctionnalités clés :

Surveillance en temps réel : Les données sont actualisées régulièrement pour assurer un suivi précis de l'état de vos plantes.
Interface intuitive : Simple à utiliser, même pour les non-experts.
Multi-capteurs : Gérez plusieurs plantes avec des capteurs connectés.

## 🏗️ Architecture Logicielle

### 📦 Structure

L'architecture du projet est divisée en trois grandes parties :

Front-End (React) :
    Fournit l'interface utilisateur pour visualiser et interagir avec les données.
    Récupère les données des plantes via des requêtes HTTP envoyées au back-end.

Back-End (Node.js) :
    Gère les requêtes des capteurs (ESP8266).
    Stocke les données dans une base de données et les envoie au front-end.
    Gère les connexions et la configuration des capteurs.

ESP8266 (Capteurs) :
    Les capteurs mesurent la température, l'humidité de l'air et du sol.
    Envoient les données au back-end via une connexion Wi-Fi.

MySQL (BDD) :
    Les mesures sont enregistré dans la base de données. 

### 🛠️ Développement
Variables d'environnement :

Voici quelques variables d'environnement que vous devrez peut-être configurer dans votre fichier docker-compose.yml