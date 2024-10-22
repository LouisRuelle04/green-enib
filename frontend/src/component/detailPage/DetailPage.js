import React, { useEffect, useState } from 'react';
import { Card, CardMedia, Grid2, Select, Typography, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';


import CircularProgressPlus from '../cummon/circularProgressPlus/CircularPrgressPlus';
import PlantGraph from '../cummon/plantGraph/PlantGraph'


export default function DetailPage(props) {
    let name = props.plant['name'];
    let temperature = props.plant['temperature'];
    let humidity = props.plant['humidity'];
    let brightness = props.plant['brightness'];
    let image = props.plant['image'];

    const [time, setTime] = useState('day');

    useEffect(()=> {
        props.socket?.emit("getMesure", { time: time, value: props.plant['name'] })
    },[])

    const handleGetMesure = (event) => {
        setTime(event.target.value)
        console.log({ time: event.target.value, value: props.plant['name'] })
        props.socket.emit("getMesure", { time: event.target.value, value: props.plant['name'] })
    }

    return (
        <Grid2 container spacing={6}>
            <Grid2 size={{ xs: 12, md: 6 }} display={"flex"}>
                <Card sx={{ width: 250, height: 250, display: 'flex', flexDirection: 'row', backgroundColor: '#BBDDAF', mt: 6, m: 6 }}>
                    <CardMedia sx={{ width: '100%', height: '100%', objectFit: 'cover' }} component={"img"} height={"140"} image={image} alt={`${name} Image`}></CardMedia>
                </Card>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Box sx={{
                        justifyContent: 'center', textAlign: 'center', display: 'flex', flexDirection: 'column', ml: 2
                    }}
                    >
                        <Typography fontFamily={'Barlow'} fontSize={40} sx={{ m: 2 }}>{name}</Typography>
                        <CircularProgressPlus color='#00CFFD' variant='determinate' value={humidity} valuemax={100} unit={"%"} label={'humidity'}></CircularProgressPlus>
                        <CircularProgressPlus color='green' variant='determinate' value={temperature} valuemax={100} unit={'°C'} label={'temperature'}></CircularProgressPlus>
                        <CircularProgressPlus color='#F1FF4E' variant='determinate' value={brightness} valuemax={2000} unit={'°C'} label={'Ensoleillement'}></CircularProgressPlus>
                    </Box>
                </Box>
                <Box sx={{mt:5}}>
                    <Select
                        labelId="select-time"
                        id="select-time"
                        value={time}
                        label="Temps"
                        onChange={handleGetMesure}
                    >
                        <MenuItem value={"day"}>day</MenuItem>
                        <MenuItem value={"week"}>week</MenuItem>
                        <MenuItem value={"month"}>month</MenuItem>
                        <MenuItem value={"year"}>year</MenuItem>
                        <MenuItem value={"all"}>all</MenuItem>
                    </Select>
                </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 12 }}>
                <PlantGraph data={props.data} />
            </Grid2>
        </Grid2>

    );

}