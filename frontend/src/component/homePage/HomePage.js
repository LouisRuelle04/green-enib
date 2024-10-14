import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './HomePage.css';

import { Card, CardActionArea, CardMedia, Container, Grid2 } from '@mui/material';
import Cards from '../cummon/cards/Cards';







function HomePage(props) {
  let capteurs = props.data;

  return (
    <>
      <Container maxWidth='xl' sx={{ mt: 6 }}>
        <Grid2 container spacing={6}>
          {
            capteurs.map((capteur) => (
              <Grid2 display={'flex'} size={{ xs: 12, md: 3 }}>

                <Cards data={capteur} onCardClick={props.onCardClick}></Cards>

              </Grid2>
            ))
          }
        </Grid2>
      </Container>

    </>

  );
}

export default HomePage;
