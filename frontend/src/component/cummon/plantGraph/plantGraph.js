import React from "react";
import { LineChart } from '@mui/x-charts/LineChart';

export default function PlantGraph(props) {


  // Vérifie la taille des listes
  if (props.xAxis.length !== props.series.length) {
    props.Display(false)
    return (
      <>
      </>
    );
  } 

  // Vérifie que tous les éléments sont de type nombre
  else if (!props.xAxis.every(item => typeof item === 'number') || !props.series.every(item => typeof item === 'number')) {
    props.Display(false)
    return (
      <>
      </>
    );
  } 

  // Affiche le graphique si toutes les conditions sont satisfaites
  else {

    props.Display(true)

    return (
      <LineChart
        xAxis={[{ data: props.xAxis }]}
        series={[
          {
            data: props.series,
            color: props.color,
          },
        ]}
        width={500}
        height={300}
      />
    );
  }
}
