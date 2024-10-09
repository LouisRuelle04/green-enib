import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Brightness1Icon from '@mui/icons-material/Brightness1';

const THINKNESS = 6;
const SIZE = 60;

export default function CircularProgressLabeled(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>

<Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Brightness1Icon sx={{color: 'white', fontSize: SIZE}}></Brightness1Icon>        
        </Box>

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress sx={{color:'gray'}} size={SIZE} className='progressBarBackground' variant='determinate' value={100} thickness={THINKNESS}/>
        
        </Box>
      
      <CircularProgress sx={{color: `${props.color}`}} size={SIZE}  variant="determinate" value={(props.value/props.valuemax)*100} thickness={THINKNESS}/>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: 'text.secondary' }}
        >
          {`${props.value}${props.unit}`}
        </Typography>
      </Box>
    </Box>
  );
}
