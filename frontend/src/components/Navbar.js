import React, { useState } from 'react';
import {logoutUser} from "../actions/user_action"
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, Toolbar, Typography, Link, Box, Grid, Container, 
  IconButton, Menu, MenuItem, Avatar, Tooltip
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const userRegister = useSelector(state => state.userRegisterReducer);
    const userLogin = useSelector(state => state.userLoginReducer);
    const currentUser = userRegister?.currentUser || userLogin?.currentUser;
    const user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;
    const userName = currentUser ? currentUser.user.name.split(" ")[0] : (user ? user.user.name.split(" ")[0] : null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Implement logout functionality
        console.log('Logout clicked');
        dispatch(logoutUser(navigate))
        //handleClose();
    };

    const handleSettings = () => {
        // Implement settings functionality
        console.log('Settings clicked');
        handleClose();
    };

    return (
        <AppBar position="fixed" color="primary" elevation={0}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Link href="/dashboard" color="inherit" underline="none">
                                <Typography variant="h5" component="div" sx={{ 
                                    fontFamily: 'Oswald', 
                                    fontSize: { xs: 20, sm: 24, md: 30 },
                                    fontWeight: 'bold',
                                    letterSpacing: 1
                                }}>
                                    Library Management System
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            {userName && (
                                <Box display="flex" alignItems="center">
                                    <Typography variant="subtitle1" sx={{ 
                                        mr: 1, 
                                        fontFamily: 'Roboto', 
                                        display: { xs: 'none', sm: 'block' }
                                    }}>
                                        Welcome, {userName}
                                    </Typography>
                                    <Tooltip title="Account settings">
                                        <IconButton
                                            size="large"
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleMenu}
                                            color="inherit"
                                        >
                                            <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                                                {userName[0].toUpperCase()}
                                            </Avatar>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleSettings}>
                                            <SettingsIcon sx={{ mr: 1 }} /> Settings
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            <ExitToAppIcon sx={{ mr: 1 }} /> Logout
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;