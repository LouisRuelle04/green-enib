const fetch = require('node-fetch');

const fetchDataFromEndpoint = async (ip) => {
    const url = `http://${ip}/data`; // Construire l'URL avec l'IP fournie

    try {
        const response = await fetch(url, { timeout: 5000 });
        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        return null; 
    }
};

module.exports = { fetchDataFromEndpoint }; // Exporter la fonction pour l'utiliser dans d'autres fichiers