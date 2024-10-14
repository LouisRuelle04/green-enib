import React from 'react';
import {Card, CardMedia, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgressPlus from '../cummon/circularProgressPlus/CircularPrgressPlus';



export default function DetailPage(props) {
    let name = props.plant['name'];
    let temperature = props.plant['temperature'];
    let humidity = props.plant['humidity'];
    let brightness = props.plant['brightness'];
    let image = props.plant['image'];

    return (
        <>
        <Box sx={{display:'flex'}}>
        <Card sx={{ width: 345 , height:345, display: 'flex', flexDirection: 'column', backgroundColor:'#BBDDAF', mt: 6 , m:6}}>
            <CardMedia sx = {{ width: '100%', height: '100%', objectFit: 'cover'}}  component={"img"} height={"140"} image={image} alt={`${name} Image`}></CardMedia>
        </Card>
        <Card sx={{height: 345, m:6}}>
            <Box sx={{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Box sx={{justifyContent: 'center', textAlign: 'center', display:'flex',   flexDirection: 'column', ml:2, backgroundColor: 'red'
            }}>
                <Typography fontFamily={'Barlow'} fontSize={40} sx={{m:2}}>{name}</Typography>
                <CircularProgressPlus color='#00CFFD' variant='determinate' value={humidity} valuemax={100} unit={"%"} label={'humidity'}></CircularProgressPlus>
                <CircularProgressPlus color='green' variant='determinate' value={temperature} valuemax={100} unit={'°C'} label={'temperature'}></CircularProgressPlus>
                <CircularProgressPlus color='#F1FF4E' variant='determinate' value={brightness} valuemax={2000} unit={'°C'} label={'Ensoleillement'}></CircularProgressPlus>
            </Box>
            
            <Box>
                

            </Box>
            </Box>
        </Card>
        </Box>
        </>
    );

}