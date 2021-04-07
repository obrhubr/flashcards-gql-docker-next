const mongoose = require("mongoose");

const Flashcard = mongoose.model("Flashcard", { 
    name: String,
    text: String
});

exports.Flashcard = Flashcard; 