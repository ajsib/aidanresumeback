// ./routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ success: true, message: 'User created' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
    }
    user.comparePassword(password, (err, isMatch) => {
      if (isMatch && !err) {
        res.json({ success: true, message: 'User authenticated!' });
      } else {
        res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
