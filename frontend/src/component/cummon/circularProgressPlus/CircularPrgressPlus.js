import React, {useState, useEffect} from "react";
import CircularProgressLabeled from "../circularProgressLabeled/CircularProgressLabeled";
import { Box , Button, Chip, Typography} from "@mui/material";


export default function CircularProgressPlus(props) {
    const [chipColor, setChipColor] = useState('#FFFFFF');

    useEffect(() => {
        if (props.selected) {
            setChipColor(props.color);
        } else {
            setChipColor('#FFFFFF');
        }
    }, [props.selected, props.color]);

    const handleMouseEnter = () => {
        if (!props.selected) {
            setChipColor(props.color);
        }
    };

    const handleMouseLeave = () => {
        if (!props.selected) {
            setChipColor('#FFFFFF');
        }
    };


    return( 
        <Box sx={{ position: 'relative',
            display: 'inline-flex',
            width: 250
            }}>
            <Box>
                <Chip className={"buttonChips"} clickable={true} sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 60,
                ml:2,
                backgroundColor: `${chipColor} !important`,
                mr:2,
                fontFamily:'Barlow',
                }}
                variant="outlined"
                label={props.label}
                color={chipColor}
                thickness={5}
                onClick={() =>{props.chipSelection(props.label,props.color)
                }}
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave} ></Chip>
            </Box>
            <Box>
            <CircularProgressLabeled color={props.color} variant='determinate' value={props.value} valuemax={props.valuemax} unit={props.unit}></CircularProgressLabeled>
            </Box>
        </Box>
    );
}