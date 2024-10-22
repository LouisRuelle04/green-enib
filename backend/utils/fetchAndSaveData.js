
// utils.js
const fetch = require('node-fetch');
const {db} = require('../db/db');

const fetchDataFromEndpoint = async (ip) => {
  const url = `http://${ip}/data`; // Construire l'URL avec l'IP fournie

  try {
      const response = await fetch(url, { timeout: 5000 });
      const data = await response.json(); 
      return data;
  } catch (error) {
      console.error('Erreur lors de la récupération des données :',ip);
      return null; 
  }
};

const getAllIp = async () => {
  try {
      // Obtenir une connexion du pool
      const connection = await db.getConnection();
      
      try {
          const [results] = await connection.query('SELECT ip FROM capteurIp');
          const ipList = results.map(row => row.ip);
          console.log(ipList);
          return ipList;
      } finally {
          // Relâcher la connexion une fois la requête terminée
          connection.release();
      }
  } catch (error) {
      console.error('Erreur lors de la récupération des IPs:', error);
      throw error;
  }
}

const setMesureFromCapteur = async (ipcapteur, temperature, humidity, soilHumidity) => {
  try {

      const query = `
          INSERT INTO mesure (ipcapteur, temperature, humidity,soilHumidity, dateMesure)
          VALUES (
              (SELECT id FROM capteurIp WHERE ip = ?), ?, ?,?, CONVERT_TZ(NOW(), 'UTC', 'Europe/Paris')
          )
          ON DUPLICATE KEY UPDATE
          temperature = VALUES(temperature),
          humidity = VALUES(humidity),
          dateMesure = CONVERT_TZ(NOW(), 'UTC', 'Europe/Paris');
      `;

      // Exécuter la requête avec les paramètres
      const [result] = await db.query(query, [ipcapteur, temperature, humidity, soilHumidity], (err, results) => {
          if (err) {
              console.error('Erreur lors de l\'insertion des mesures :', err);
              return; // Ne pas retourner une promesse
          }
          console.log('Mesures insérées avec succès:', results);
      });
      
  } catch (error) {
      console.error('Erreur lors de l\'insertion de la mesure:', error);
      throw error;
  }
}

const fetchAndSaveData = async () => {
  try {
      const liste_ip = await getAllIp()
      for (let ip of liste_ip) {
          const data = await fetchDataFromEndpoint(ip);
      
  
          if (data) {
              await setMesureFromCapteur(ip,data["temperature"],data["humidity"], data["soilHumidity"])        
          } else {
              console.log('Erreur donnée capteur :',ip);
          }
      }
  } catch (error) {
      console.error('Erreur lors de l\'insertion des mesures :', error);
  }

};

module.exports = { fetchAndSaveData };