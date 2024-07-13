const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const Student = require('../models/student')

// Add a new review
router.post('/ratings', async (req, res) => {
  try {
    const { bookId, review, rating, userId } = req.body;
    const user=await Student.findOne({_id:userId});
    console.log(user);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const userName=user.name;
    const newReview = new Review({
      bookId,
      userName,
      review,
      rating
    });

    await newReview.save();

    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    res.status(400).json({ message: 'Error adding review', error: error.message });
  }
});

// Get reviews for a specific book
router.get('/book/:bookId', async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const reviews = await Review.find({ bookId });
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching reviews', error: error.message });
  }
});

module.exports = router;