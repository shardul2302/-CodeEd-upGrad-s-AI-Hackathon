
const express = require('express');
const router = express.Router();
const Content = require('../models/Content');

// Get all content (optional: filter by category)
const contents = require("../data/contentData"); // ✅ Import hardcoded data

// GET all content
router.get("/", (req, res) => {
  res.json(contents);
});

// Add new content
router.post('/', async (req, res) => {
    const { topic, type, url, duration, reward } = req.body;
    try {
        const newContent = new Content({ topic, type, url, duration, reward });
        await newContent.save();
        res.json(newContent);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
