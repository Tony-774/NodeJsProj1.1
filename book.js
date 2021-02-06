const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    Genre: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },

},{timestamps: true});

const Book = mongoose.model('book', bookSchema);
module.exports = Book;