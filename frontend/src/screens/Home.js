import React from 'react';
import { Link } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, Typography, Container, Grid,useTheme,useMediaQuery, } from '@mui/material';
import StudentImage from "../Images/student3.jpg";
import AdminImage from "../Images/admin2.jpg";
import library from "../Images/Libary.jpg";

const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'background.default',
                backgroundImage:`url(${library})`
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={6} sm={6}>
                        <Card 
                            sx={{ 
                                maxWidth: isMobile ? 200 : 350,
                                m: 'auto',
                                backgroundColor:'transparent',
                                transition: '0.3s',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: 3
                                }
                            }}
                        >
                            <CardMedia
                                component="img"
                                height={isMobile ? 200 : 350}
                                width={isMobile ? 200 : 400}
                                image={AdminImage}
                                sx={{borderRadius:'50%'}}
                                alt="Admin Image"
                            />
                            <CardContent sx={{textAlign:'center'}}>
                                <Typography 
                                    component={Link} 
                                    to="/adminLogin"
                                    variant="h5"
                                    align="center"
                                    sx={{
                                        fontFamily: 'Oswald, sans-serif',
                                        textDecoration: 'none',
                                        color: 'white',
                                        fontSize:isMobile ? '1rem' : '1.5rem',
                                        '&:hover': {
                                            color: 'primary.main'
                                        },
                                    }}
                                >
                                    Sign in as Admin
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Card 
                            sx={{ 
                                maxWidth: isMobile ? 200 : 350,
                                m: 'auto',
                                transition: '0.3s',
                                backgroundColor:'transparent',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: 3
                                }
                            }}
                        >
                            <CardMedia
                                component="img"
                                height={isMobile ? 200 : 350}
                                width={isMobile ? 200 : 400}
                                image={StudentImage}
                                sx={{borderRadius:'50%'}}
                                alt="Student Image"
                            />
                            <CardContent sx={{textAlign:'center'}}>
                                <Typography 
                                    component={Link} 
                                    to="/login"
                                    variant="h5"
                                    align="center"
                                    sx={{
                                        fontFamily: 'Oswald, sans-serif',
                                        textDecoration: 'none',
                                        textAlign:'center',
                                        color: 'white',
                                        fontSize:isMobile ? '1rem' : '1.5rem',
                                        '&:hover': {
                                            color: 'primary.main'
                                        }
                                    }}
                                >
                                    Sign in as Student
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Home;
 
