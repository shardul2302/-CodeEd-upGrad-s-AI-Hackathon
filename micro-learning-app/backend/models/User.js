const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    goal: String,
    category: String, // Beginner/Intermediate/Advanced
    dailyProgress: [{
        date: Date,
        topics: [String],
        quizScore: Number
    }]
});

module.exports = mongoose.model('User', UserSchema);
