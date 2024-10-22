const socketIo = require('socket.io');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { db } = require('../db/db');


//--------- INIT WEBSOCKET SERVER -------------//
const portWebsocket = 8080;
const server = http.createServer();
const io = socketIo(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });
//--------- END INIT WEBSOCKET SERVER -------------//


//--------- INIT EXPRESS SERVER -------------//
const portExpress = 8081;
const app = express();
app.use(bodyParser.json());
//--------- END INIT EXPRESS SERVER -------------//


//-------- IMPORT FUNCTION ------------//
const { fetchDataFromEndpoint } = require('../utils/captorRequest');
const { getAllCapteurIp } = require('../utils/getAllCapteurIp')
const { setMesureCapteur } = require('../utils/setMesureCapteur')
const { getDailyCapteur } = require('../utils/getDailyCapteur')
const {getLastMesure} = require('../utils/getLastMesure')
const {fetchAndSaveData} = require('../utils/fetchAndSaveData')
const {getMesureFromPlant} = require('../utils/getMesureFromPlant')
//-------- END IMPORT FUNCTION ------------//


//-------------- IP TABLE --------------------//
//  ESP32 - 1 : température & humidité ambiante
const ESP8266_1_IP = '192.168.58.134';
//  ESP32 - 2 : 
const ESP8266_2_IP = '192.168.58.89';
//  ESP32 - 3 :
const ESP32_3_IP = '';
//  ESP32 - 4 :
const ESP32_4_IP = '';
//  ESP32 - 5 :
//-------------- END IP TABLE -----------------//

const liste_ip = [ESP8266_1_IP, ESP8266_2_IP]


const jsonFile = {
    type: "getAllPlantes", status: "ok", content:

        [
            { name: "Cocotier", temperature: 0, humidity: 0, soilHumidity: 0, brightness: 0, image: "../assets/images/fleure_de_lune.jpg" },
            { name: "Oxalis", temperature: 0, humidity: 0, soilHumidity: 0, brightness: 0, image: "../assets/images/fleure_test.jpg" },
            { name: "Aeschynanthus Rasta", temperature: 0, humidity: 0, soilHumidity: 0, brightness: 0, image: "../assets/images/Aeschynanthus_Rasta.jpg" },
            { name: "Aloe Humilis", temperature: 0, humidity: 0, soilHumidity: 0, brightness: 0, image: "../assets/images/Aloe_Humilis.jpg" },
            { name: "Aloe hybrida", temperature: 0, humidity: 0, soilHumidity: 0, brightness: 0, image: "../assets/images/Aloe_hybrida.jpg" },

        ]
}


// ------------------------------------------------ //
// ---------------WEBSOCKET SERVER----------------- //
// ------------------------------------------------ //


io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté', socket.id);
    socket.emit('content',jsonFile)

    //GetMesure
    // -> Récupéré les données soit dernière 24h, 7 dernier jours, mois entier en BDD + capteur ip/name
    // -> renvoyé un event "GetMesured"
    //switch par le selector
    socket.on('getMesure', (value) => {
        getMesureFromPlant(value.value,value.time,socket)
    })


    socket.on('disconnect', () => {
        console.log("Un utilisateur s'est déconnecté", socket.handshake.address);
    })
})


server.listen(portWebsocket, () => {
    console.log(`Le serveur écoute sur le port ${portWebsocket}`);
});

const intervalId = setInterval(() => {
    fetchAndSaveData();
}, 5000);




// ------------------------------------------------ //
// ---------------EXPRESS SERVER------------------- //
// ------------------------------------------------ //

app.post('/config', (req, res) => {
    console.log(req.body)
    const { localIp, espName } = req.body;

    if (!localIp || !espName) {
        return res.status(400).send('IP et nom du capteur sont requis');
    }

    // Requête SQL pour insérer le capteur, ou mettre à jour s'il existe déjà
    const query = 'INSERT INTO capteurIp (ip, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = ?';

    db.execute(query, [localIp, espName, espName], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'insertion du capteur :', err);
            return res.status(500).send('Erreur serveur');
        }

        res.send('Capteur ajouté ou mis à jour avec succès');
    });
});


app.listen(portExpress, () => {
    console.log(`Serveur Express démarré sur le port ${portExpress}`);
});