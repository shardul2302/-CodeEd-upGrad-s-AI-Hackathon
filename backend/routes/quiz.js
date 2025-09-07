
const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Get quiz for content
router.get('/:contentId', async (req, res) => {
    try {
        const quiz = await Quiz.find({ contentId: req.params.contentId });
        res.json(quiz);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add quiz
router.post('/', async (req, res) => {
    const { contentId, question, options, answer } = req.body;
    try {
        const newQuiz = new Quiz({ contentId, question, options, answer });
        await newQuiz.save();
        res.json(newQuiz);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
