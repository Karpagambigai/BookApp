const express = require('express');

const bookRouter = express.Router();
const debug = require('debug')('app:bookRoutes');
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodreadsService');

function router(nav) {
    const { getIndex, getById, middleware, postNew, addNewBook, updateOneBook, deleteBook } = bookController(bookService, nav);
    bookRouter.use(middleware);
    bookRouter.route('/')
        .get(getIndex)
        .post(postNew);
    bookRouter.route('/:id')
        .get(getById);
    bookRouter.route('/:id')
        .put(addNewBook)
        .patch(updateOneBook)
        .delete(deleteBook);
    return bookRouter;
}

module.exports = router;
