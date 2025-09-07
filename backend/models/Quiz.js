const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    contentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' },
    question: String,
    options: [String],
    answer: String
});

module.exports = mongoose.model('Quiz', QuizSchema);
