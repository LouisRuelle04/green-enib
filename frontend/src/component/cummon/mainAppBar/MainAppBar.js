import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import {useMediaQuery, Avatar, Menu, MenuItem} from "@mui/material";


import Brightness1Icon from '@mui/icons-material/Brightness1';
import PersonIcon from '@mui/icons-material/Person';





export default function MainAppBar(props) {

    const matches = useMediaQuery('(min-width:600px)')

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
    <>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className='mainAppBar' sx={{backgroundColor: '#126A10'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() =>  {props.onTitleClick()}}
          >
            <HomeIcon sx={{fontSize: matches ? 48 : 24}}/>
          </IconButton>
          <Typography onClick={() =>  {props.onTitleClick()}} variant="h6" component="div" sx={{ flexGrow: 1 , textAlign: 'center'}} fontFamily={'Bevan'} fontSize={matches ? 48 : 24}>
            Green-Enib          </Typography>
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Typography variant="h6" component="div" fontFamily={'Barlow'}> Serveur :</Typography>
            <Brightness1Icon sx={{amt:1, marginLeft:1, color: props.serveurStatus ? "#1bff00" : "red"}}></Brightness1Icon>
            <IconButton
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{marginLeft:4, mt:1}}
              >
            <Avatar/>
            </IconButton>
          
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Se connecter</MenuItem>
              <MenuItem onClick={handleClose}></MenuItem>
              <MenuItem onClick={handleClose}></MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
    </>

    );

}