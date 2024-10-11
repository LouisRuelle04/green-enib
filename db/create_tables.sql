-- Créer la table capteurIp
CREATE TABLE IF NOT EXISTS capteurIp (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Identifiant unique pour chaque capteur
    ip VARCHAR(15) NOT NULL UNIQUE,      -- Adresse IP du capteur (unique)
    name VARCHAR(100) NOT NULL            -- Nom du capteur
);

-- Créer la table mesure
CREATE TABLE IF NOT EXISTS mesure (
    id INT AUTO_INCREMENT PRIMARY KEY,   -- Identifiant unique pour chaque mesure
    ipcapteur INT NOT NULL,              -- Clé étrangère pour lier à capteurIp
    temperature FLOAT,                   -- Température mesurée
    humidity FLOAT,                      -- Humidité mesurée
    soilHumidity FLOAT,                  -- Humidité du sol mesurée
    lumens FLOAT,                        -- Luminosité mesurée
    FOREIGN KEY (ipcapteur) REFERENCES capteurIp(id)  -- Contrainte de clé étrangère
);