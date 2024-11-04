const express = require('express');
const {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
} = require('../controllers/BookController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/", auth, addBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.put("/:id", auth, updateBook);
router.delete("/:id", auth, deleteBook);

module.exports = router;