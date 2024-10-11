const socketIo = require('socket.io');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');

const server = http.createServer();
const io = socketIo(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });
const port = 8080;

//--------- INIT EXPRESS SERVER -------------//
const app = express();

app.use(bodyParser.json());
//--------- END INIT EXPRESS SERVER -------------//


//-------- IMPORT FUNCTION ------------//
const { fetchDataFromEndpoint } = require('../utils/captorRequest'); // Importer la fonction
//-------- END IMPORT FUNCTION ------------//


//-------- BDD CONNECTION ------------//
if (!dbUrl) {
    console.error('DATABASE_URL n\'est pas défini');
    process.exit(1); // Quitter l'application si l'URL n'est pas définie
}
//-------- END BDD CONNECTION ------------//

//-------------- IP TABLE --------------------//
//  ESP32 - 1 : température & humidité ambiante
const ESP8266_1_IP = '192.168.1.23';
//  ESP32 - 2 : 
const PICO_2_IP = '192.168.50.97';
//  ESP32 - 3 :
const ESP32_3_IP = '';
//  ESP32 - 4 :
const ESP32_4_IP = '';
//  ESP32 - 5 :
//-------------- END IP TABLE -----------------//

const liste_ip = [ESP8266_1_IP]


const jsonFile = {
    type:"getAllPlantes", status:"ok", content:
    
    [
        {name:"Fleure de lune", temperature:0, humidity:0,soilHumidity:0, brightness: 0, image:"../assets/images/fleure_de_lune.jpg"},
        {name:"Fleure test", temperature:0, humidity: 0, soilHumidity:0,brightness:0, image:"../assets/images/fleure_test.jpg" },
        {name:"Aeschynanthus Rasta", temperature:0, humidity: 0,soilHumidity:0, brightness:0, image:"../assets/images/Aeschynanthus_Rasta.jpg" },
        {name:"Aloe Humilis", temperature:0, humidity: 0,soilHumidity:0, brightness:0, image:"../assets/images/Aloe_Humilis.jpg" },
        {name:"Aloe hybrida", temperature:0, humidity: 0, soilHumidity:0,brightness:0, image:"../assets/images/Aloe_hybrida.jpg" },
      
      ]
} 


// ------------------------------------------------ //
// ---------------WEBSOCKET SERVER----------------- //
// ------------------------------------------------ //


io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté', socket.id);

    socket.emit('content', jsonFile)
    const fetchAndSendData = async (ip) => {
        const data = await fetchDataFromEndpoint(ip);
        console.log(data)
        if (data) {
            const JSONresponse_data = JSON.stringify({ name: 'Fleure de lune', temperature: data["temperature"], humidity: data["humidity"],soilHumidity: data["soilHumidity"], status: "ok" })
            socket.emit('getData', JSONresponse_data);
            console.log('Donnée envoyée:', JSONresponse_data);
        } else {
            //const JSONresponse_data = JSON.stringify({ status: "error" })
            console.log('Donnée envoyée:', data);
            //socket.emit('getData', JSONresponse_data);
        }
    };

    const intervalId = setInterval(() => {
        for (let ip of liste_ip) {
            fetchAndSendData(ip);
        }
    }, 5000);

    socket.on('disconnect', () => {
        console.log("Un utilisateur s'est déconnecté", socket.handshake.address); 
        clearInterval(intervalId);
    })
})


server.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
});




// ------------------------------------------------ //
// ---------------EXPRESS SERVER------------------- //
// ------------------------------------------------ //

app.post('/config', (req, res) => {
    const { ip, name } = req.body;
  
    if (!ip || !name) {
      return res.status(400).send('IP et nom du capteur sont requis');
    }
  
    // Requête SQL pour insérer le capteur, ou mettre à jour s'il existe déjà
    const query = 'INSERT INTO capteurIp (ip, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = ?';
  
    db.execute(query, [ip, name, name], (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'insertion du capteur :', err);
        return res.status(500).send('Erreur serveur');
      }
  
      res.send('Capteur ajouté ou mis à jour avec succès');
    });
  });