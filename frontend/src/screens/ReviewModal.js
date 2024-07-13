import React, { useState } from 'react';
import { 
  Modal, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Rating
} from '@mui/material';
import axios from 'axios';

const ReviewModal = ({ open, handleClose, bookId, userId }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/reviews/ratings', { bookId, review, rating, userId });
      handleClose();
      // You might want to refresh the book details or reviews list here
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Add Your Review
        </Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
        <TextField
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          sx={{ my: 2 }}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Submit Review
        </Button>
      </Box>
    </Modal>
  );
};

export default ReviewModal;