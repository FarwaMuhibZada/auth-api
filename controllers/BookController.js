const Book = require('../models/Book');

exports.addBook = async (req, res) => {
    const { title, author, description, price } = req.body;
    try {
        const book = new Book({
            title,
            author,
            description,
            price,
            user: req.user.id,
        });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate("user", "username");
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};