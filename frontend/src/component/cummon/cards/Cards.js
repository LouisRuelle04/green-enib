import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CircularProgressLabeled from '../circularProgressLabeled/CircularProgressLabeled';
import { Box } from '@mui/material';



export default function Cards(props) {
  let capteur = props.data;

  return (
    <Card sx={{ width: 345 , display: 'flex', flexDirection: 'column', backgroundColor:'#BBDDAF'}} className='plantecard'>
              <CardActionArea onClick={() => props.onCardClick(capteur)}>

              <CardMedia component={"img"} height={"140"} image={capteur["image"]} alt={`${capteur["name"]} Image`}></CardMedia>

              <Typography variant='h6' component={"div"} sx={{mb:2}} fontFamily={'Barlow'} fontSize={24}>
                {capteur["name"]}
              </Typography>

              <Box sx={{display:'flex', flexDirection:'row', mb:2 , justifyContent:'space-evenly'}}>
  
                <CircularProgressLabeled color='darkblue' variant='determinate' value={capteur['soilHumidity']} valuemax={100} unit={'%'}></CircularProgressLabeled>

                <CircularProgressLabeled color='#00CFFD' variant='determinate' value={capteur["humidity"]} valuemax={100} unit={"%"}/>

                <CircularProgressLabeled color='green' variant='determinate' value={`${capteur["temperature"]}`} valuemax={100} unit={"°C"}/>

                <CircularProgressLabeled color='#F1FF4E' variant='determinate' value={`${capteur["brightness"]}`} valuemax={2000} unit={""}/>

              </Box> 
              </CardActionArea>  

            </Card>
  );
}