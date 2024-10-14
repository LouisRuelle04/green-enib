const setMesureCapteur = (db, ip, data) => {
    try {
        // Requête SQL pour insérer les mesures dans la table "mesure"
        console.log("SQL request data:", data);
        const query = `
            INSERT INTO mesure (ipcapteur, temperature, humidity, soilHumidity, lumens, dateMesure)
            VALUES (
                (SELECT id FROM capteurIp WHERE ip = ?), ?, ?, ?, ?, CONVERT_TZ(NOW(), 'UTC', 'Europe/Paris')
            )
            ON DUPLICATE KEY UPDATE
            temperature = VALUES(temperature),
            humidity = VALUES(humidity),
            soilHumidity = VALUES(soilHumidity),
            lumens = VALUES(lumens),
            dateMesure = CONVERT_TZ(NOW(), 'UTC', 'Europe/Paris');
        `;

        // Exécution de la requête SQL avec les valeurs fournies
        db.execute(query, [ip, data.temperature, data.humidity, data.soilHumidity, data.lumens], (err, results) => {
            if (err) {
                console.error('Erreur lors de l\'insertion des mesures :', err);
                return; // Ne pas retourner une promesse
            }
            console.log('Mesures insérées avec succès:', results);
        });
    } catch (error) {
        console.error('Erreur dans la fonction setMesureCapteur:', error);
    }
};

module.exports = { setMesureCapteur };
