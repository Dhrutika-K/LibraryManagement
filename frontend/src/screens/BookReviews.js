import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Rating,
  Divider,
  CircularProgress
} from '@mui/material';
import axios from 'axios';

const BookReviews = ({ open, handleClose, bookId, bookTitle }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (bookId) {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:5000/api/reviews/book/${bookId}`);
          setReviews(response.data);
          console.log(response)
        } catch (error) {
          console.error('Error fetching reviews:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchReviews();
  }, [bookId]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 600,
        maxHeight: '90vh',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        overflowY: 'auto',
      }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Reviews for {bookTitle}
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress />
          </Box>
        ) : reviews.length > 0 ? (
          <List>
            {reviews.map((review, index) => (
              <React.Fragment key={review._id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar/>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography component="span" variant="subtitle1" color="text.primary">
                          {review.userName}
                        </Typography>
                        <Rating value={review.rating} readOnly size="small" sx={{ ml: 1 }} />
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {review.review}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index < reviews.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography variant="body1">No reviews yet for this book.</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default BookReviews;