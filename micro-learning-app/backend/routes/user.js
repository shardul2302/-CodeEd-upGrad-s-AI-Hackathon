
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create new user
router.post('/', async (req, res) => {
    const { name, email, goal } = req.body;
    try {
        const newUser = new User({ name, email, goal, category: 'Beginner', dailyProgress: [] });
        await newUser.save();
        res.json(newUser);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
