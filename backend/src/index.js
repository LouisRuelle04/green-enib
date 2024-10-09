const socketIo = require('socket.io');
const http = require('http');

const server = http.createServer();
const io = socketIo(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });
const port = 8080;


// -------- IMPORT FUNCTION ------------//
const { fetchDataFromEndpoint } = require('../utils/captorRequest'); // Importer la fonction
// -------- END IMPORT FUNCTION ------------//


// -------------- IP TABLE --------------------//
//  ESP32 - 1 : température & humidité ambiante
const ESP8266_1_IP = '192.168.1.23';
//  ESP32 - 2 : 
const PICO_2_IP = '192.168.50.97';
//  ESP32 - 3 :
const ESP32_3_IP = '';
//  ESP32 - 4 :
const ESP32_4_IP = '';
//  ESP32 - 5 :
// -------------- END IP TABLE -----------------//

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