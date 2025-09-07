
const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    topic: String,
    type: String, // video, meme, puzzle, flashcard
    url: String, // video/image link
    duration: Number, // seconds
    reward: String // badge, mystery box, goodies
});

module.exports = mongoose.model('Content', ContentSchema);
