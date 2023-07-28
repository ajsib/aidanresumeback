const express = require('express');
const User = require('../models/user');

module.exports = (client) => {
  const router = express.Router();
  const db = client.db('your-database-name'); // Replace with your database name

  router.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = new User(db, username, password);
      await user.save();
      res.status(201).json({ success: true, message: 'User created' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const userDoc = await db.collection('users').findOne({ username });
      if (!userDoc) {
        return res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
      }
      const user = new User(db, username, userDoc.password);
      const isMatch = await user.comparePassword(password);
      if (isMatch) {
        res.json({ success: true, message: 'User authenticated!' });
      } else {
        res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  return router;
};
