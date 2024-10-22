const { db } = require('../db/db');

const getMesureFromPlant = async (plantName, value, socket) => {
    try {
        let results;
        let tableData;

        // Sélectionner les mesures en fonction du nom de la plante (capteur)
        switch (value) {
            case "day":
                // Sélectionne les données des 24 dernières heures
                [results] = await db.query(`
                    SELECT m.temperature, m.humidity, m.soilHumidity, m.lumens, m.dateMesure
                    FROM mesure m
                    INNER JOIN capteurIp c ON m.ipcapteur = c.id
                    WHERE c.name = ?
                    AND m.dateMesure >= NOW() - INTERVAL 1 DAY
                `, [plantName]);
                tableData = results.map(row => row);
                console.log(tableData[0])
                socket.emit("getMesure", tableData);
                break;

            case "week":
                // Sélectionne les données des 7 derniers jours
                [results] = await db.query(`
                    SELECT m.temperature, m.humidity, m.soilHumidity, m.lumens, m.dateMesure
                    FROM mesure m
                    INNER JOIN capteurIp c ON m.ipcapteur = c.id
                    WHERE c.name = ?
                    AND m.dateMesure >= NOW() - INTERVAL 1 WEEK
                `, [plantName]);
                tableData = results.map(row => row);

                socket.emit("getMesure", tableData);
                break;

            case "month":
                // Sélectionne les données du mois dernier
                [results] = await db.query(`
                    SELECT m.temperature, m.humidity, m.soilHumidity, m.lumens, m.dateMesure
                    FROM mesure m
                    INNER JOIN capteurIp c ON m.ipcapteur = c.id
                    WHERE c.name = ?
                    AND m.dateMesure >= NOW() - INTERVAL 1 MONTH
                `, [plantName]);
                tableData = results.map(row => row);

                socket.emit("getMesure", tableData);
                break;

            case "year":
                // Sélectionne les données de l'année entière
                [results] = await db.query(`
                    SELECT m.temperature, m.humidity, m.soilHumidity, m.lumens, m.dateMesure
                    FROM mesure m
                    INNER JOIN capteurIp c ON m.ipcapteur = c.id
                    WHERE c.name = ?
                    AND YEAR(m.dateMesure) = YEAR(CURDATE())
                `, [plantName]);
                tableData = results.map(row => row);

                socket.emit("getMesure", tableData);
                break;

            case "all":
                // Sélectionne toutes les données disponibles
                [results] = await db.query(`
                    SELECT m.temperature, m.humidity, m.soilHumidity, m.lumens, m.dateMesure
                    FROM mesure m
                    INNER JOIN capteurIp c ON m.ipcapteur = c.id
                    WHERE c.name = ?
                `, [plantName]);
                tableData = results.map(row => row);

                socket.emit("getMesure", tableData);
                break;

            default:
                throw new Error("Période de temps non supportée");
        }

    } catch (error) {
        console.error("Erreur lors de l'envoi des données", plantName, error);
        throw error;
    }
};


module.exports = { getMesureFromPlant };



