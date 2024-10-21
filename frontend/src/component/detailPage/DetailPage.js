import React, { useState, useEffect } from 'react';
import {Button, Card, CardMedia, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgressPlus from '../cummon/circularProgressPlus/CircularPrgressPlus';

import PlantGraph from '../cummon/plantGraph/plantGraph.js'
import { red } from '@mui/material/colors';


export default function DetailPage(props) {


        
    const [graphDisplayed, setGraphDisplayed] = useState(false);
    const [curveColor, setCurveColor] = useState("#00CFFD")
    const [selectedChip, setSelectedchip] = useState('Humidity')
    const [timeSelector, setTimeSelector] = useState(1)
    const [xData, setXData] = useState([])
    const [series, setSeries] = useState([])

    useEffect(() => {
        if(selectedChip === 'Humidity'){
            setXData([1,2,3,4])
            setSeries([34.2, 36.4, 35.0, 35.0])
        }
        else if(selectedChip === 'Temperature') {
            setXData([1,2,3,4])
            setSeries([19,19.2,19.4,18.3])
        }else if(selectedChip === 'Ensoleillement'){
            setXData([1,2,3,4])
            setSeries([1920, 2000,1500,1300])
        }
    }, [selectedChip]);


    const buttonClick = (time) => {
        setTimeSelector(time)
    }

    const handleGraphVisibility = (value) => {
        props.setGraphDisplayed(value);
    }

    const handleChipSelection = (chip,color) => {
        setSelectedchip(chip)
        setCurveColor(color)

    }


    let name = props.plant['name'];
    let temperature = props.plant['temperature'];
    let humidity = props.plant['humidity'];
    let brightness = props.plant['brightness'];
    let image = props.plant['image'];
    return (
        <>
        <Box sx={{display:'flex'}}>
            <Card sx={{ width: 345 , display: 'flex', flexDirection: 'column', backgroundColor:'#BBDDAF', mt: 6 , m:6}}>
                <CardMedia sx = {{ width: '100%', height: '100%', objectFit: 'cover'}}  component={"img"} height={"140"} image={image} alt={`${name} Image`}></CardMedia>
            </Card>
            <Card sx={{ m:6}}>
                <Box sx={{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <Box sx={{justifyContent: 'center', textAlign: 'center', display:'flex',   flexDirection: 'column', ml:2,   
                    }}>
                        <Typography fontFamily={'Barlow'} fontSize={40} sx={{m:2}}>{name}</Typography>
                        <CircularProgressPlus color='#00CFFD' variant='determinate' value={humidity} valuemax={100} unit={"%"} label={'Humidity'} chipSelection={handleChipSelection} selected={'Humidity' === selectedChip}></CircularProgressPlus>
                        <CircularProgressPlus color='green' variant='determinate' value={temperature} valuemax={100} unit={'°C'} label={'Temperature'} chipSelection={handleChipSelection} selected={'Temperature' === selectedChip}></CircularProgressPlus>
                        <CircularProgressPlus color='#F1FF4E' variant='determinate' value={brightness} valuemax={2000} unit={'°C'} label={'Ensoleillement'} chipSelection={handleChipSelection} selected={'Ensoleillement' === selectedChip}></CircularProgressPlus>
                    </Box>
                    
                    <Box sx={{mt:4}}>
                        <PlantGraph xAxis={xData.slice(timeSelector)} series={series.slice(timeSelector)} Display={handleGraphVisibility} color={curveColor} ></PlantGraph>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between',  padding: '0 64px', mb:4}}>    
                            <Button sx={{backgroundColor:'green'}} variant="contained" onClick={() => {buttonClick(0)}}>7 derniers jours</Button>
                            <Button sx={{backgroundColor:'green'}} variant="contained" onClick={() => {buttonClick(1)}}>Mois</Button>
                            <Button sx={{backgroundColor:'green'}} variant="contained" onClick={() => {buttonClick(2)}}>Tout</Button>
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Box>
        </>
    );

}