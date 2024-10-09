import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

import HomePage from './component/homePage/HomePage.js';
import DetailPage from './component/detailPage/DetailPage.js'
import MainAppBar from './component/cummon/mainAppBar/MainAppBar.js';

 




function App() {

  const [page,setPage] = useState('home');
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [serverStatus, setServeurStatus] = useState(false);
  const [allPlants, setAllPlants] = useState([]);


  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_WEBSOCKET_URL); 

    function onConnect() {
      setServeurStatus(true)

    }
    function onDisconnect(){
      setServeurStatus(false)
    }

    function onGetAllPlants(data){
        setAllPlants(data['content'])
        console.log(allPlants)
    }

    function onGetData(data){
      data = JSON.parse(data)
      console.log(data)
      setAllPlants((prevPlants) =>
        prevPlants.map((plant) =>
          plant.name === data.name
            ? { ...plant, temperature: data.temperature, humidity: data.humidity, soilHumidity: data.soilHumidity }
            : plant
        )
      );

      if (selectedPlant && selectedPlant.name === data.name) {
        setSelectedPlant((prevPlant) => ({
          ...prevPlant,
          temperature: data.temperature,
          humidity: data.humidity,
          soilHumidity: data.soilHumidity,
        }));
      }
    }


    newSocket.on('connect', onConnect);
    newSocket.on('disconnect', onDisconnect);
    newSocket.on('content', onGetAllPlants);
    newSocket.on('getData', onGetData);
    
    

  
    return () => {
      newSocket.disconnect();
    };
  }, []);




  const handleCardClick = (plant) => {
      setSelectedPlant(plant);
      setPage('detail');
  }

  const mainMenu = () => {
    setPage('home');
  }

  const content = () => {
    if(page === 'home') return (<HomePage data={allPlants} onCardClick={handleCardClick}></HomePage>)
    else if (page === 'detail' && selectedPlant) return(<DetailPage plant={selectedPlant}></DetailPage>)
  };
  
  return (
    <>
    <MainAppBar onTitleClick={mainMenu} serveurStatus={serverStatus}/>
    {content()}
    </>
  );
}

export default App;