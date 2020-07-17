const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Book = require('../models/Book');


// @route   GET api/books
// @desk    Get all users books
// access   Private
router.get('/', auth, async (req, res) => { 
    try {
        const books = await Book.find( {user: req.user.id}).sort( { date: -1 });
        res.json(books);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route   POST api/books
// @desk    Add new book
// access   Private
router.post(
    '/', 
    [ auth, 
         [
         check('title', 'Title is required').not().isEmpty(),
         check('author', 'Author is required').not().isEmpty()
     ] 
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const  { title, author, isbn, publisher, pages, year, about, readIn, type } = req.body;

    try {
        const newContact = new Book ({
            title, 
            author, 
            isbn, 
            publisher, 
            pages, 
            year, 
            about,
            readIn, 
            type,
            user: req.user.id
        });

        const book = await newContact.save();

        res.json(book);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

});

// @route   PUT api/constacts/:id
// @desk    Update Book
// access   Private
router.put('/:id', auth, async (req, res) => {
    const { title, author, isbn, publisher, pages, year, about, readIn, type  } = req.body;

    // Build a book object
    const bookFields = {};
    if(title) bookFields.title = title;
    if(author) bookFields.author = author;
    if(isbn) bookFields.isbn = isbn;
    if(publisher) bookFields.publisher = publisher;
    if(pages) bookFields.pages = pages;
    if(year) bookFields.year = year;
    if(about) bookFields.about = about;
    if(readIn) bookFields.readIn = readIn;
    if(type) bookFields.type = type;

    try {
        let book = await Book.findById(req.params.id);
        
        if (!book) return res.status(404).json( { msg: 'Book not Found' });

        // Make sure user own the book
        if (book.user.toString() !== req.user.id ) {
            return res.status(401).json( {msg: 'Not authorized' });
        }

        book = await Book.findByIdAndUpdate(req.params.id,
            { $set: bookFields },
            { new: true });

            res.json(book);
    } catch (err) {
        console.error.error(err.message);
        res.status(500).send('Server Error')
    }

});

// @route   DELETE api/constacts/:id
// @desk    Delete book
// access   Private
router.delete('/:id', auth, async (req, res) => {
    res.send('Delete Book');

    try {
        let book = await Book.findById(req.params.id);
        
        if (!book) return res.status(404).json( { msg: 'Book not Found' });

        // Make sure user own the book
        if (book.user.toString() !== req.user.id ) {
            return res.status(401).json( {msg: 'Not authorized' });
        }

        await Book.findByIdAndRemove(req.params.id);

            res.json({ msg: 'Book removed' });
    } catch (err) {
        console.error.error(err.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router; 