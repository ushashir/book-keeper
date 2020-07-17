const mongoose = require('mongoose');


const book = require('../models/Book')

const BookSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
    },
    publisher: {
        type: String,
    },
    pages: {
        type: String,
    },
    year: {
        type: Number,
    },
    about: {
        type: String,
    },
    readIn: {
        type: String,
    },
    type: {
        type: String,
        default: 'Non-fiction'
    }, 
    date: {
        type: Date,
        default: Date.now
       
    },
});

module.exports = mongoose.model('book', BookSchema);