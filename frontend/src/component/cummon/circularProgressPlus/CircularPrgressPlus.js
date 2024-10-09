import React from "react";
import CircularProgressLabeled from "../circularProgressLabeled/CircularProgressLabeled";
import { Box , Chip, Typography} from "@mui/material";


export default function CircularProgressPlus(props) {
    return( 
        <Box sx={{ position: 'relative',
            display: 'inline-flex',
            width: 250
            }}>
            <Box>
                <Chip clickable={false} sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: props.color,
                height: 60,
                ml:2,
                mr:2
                
                }} label={props.label}></Chip>
            </Box>
            <Box>
            <CircularProgressLabeled color={props.color} variant='determinate' value={props.value} valuemax={props.valuemax} unit={props.unit}></CircularProgressLabeled>
            </Box>       
        </Box>
    );
}