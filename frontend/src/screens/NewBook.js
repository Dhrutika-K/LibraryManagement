import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const NewBooks = ({ mobile }) => {
  const [newBooks, setNewBooks] = useState([]);
  const theme = useTheme();
  const isMobile = mobile;

  const CustomArrow = ({ direction, onClick }) => (
    <Box
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
        ...(direction === 'next' ? { right: -20 } : { left: -20 }),
      }}
    >
      {direction === 'next' ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
    </Box>
  );

  useEffect(() => {
    const fetchNewBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books/allBook');
        const allBooks = response.data;
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const recentBooks = allBooks.filter(book => {
          const bookDate = new Date(book.updatedAt);
          return bookDate >= oneWeekAgo;
        });
        setNewBooks(recentBooks);
      } catch (error) {
        console.error('Error fetching new books:', error);
      }
    };
    fetchNewBooks();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: isMobile ? 1 : 4,
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
        Newly Added Books
      </Typography>
      {newBooks.length > 0 ? (
        <Slider {...settings}>
          {newBooks.map((book) => (
            <Grid item key={book._id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={book.coverImage || 'https://mit-press-us.imgix.net/covers/9780262530910.jpg?auto=format&w=298'}
                  alt={book.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" noWrap sx={{ mb: 1, fontWeight: 'bold' }}>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {book.author}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Slider>
      ) : (
        <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
          No new books added in the past week.
        </Typography>
      )}
    </Container>
  );
};

export default NewBooks;
