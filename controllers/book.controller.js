var express = require('express');
var router = express.Router();
const Joi = require('joi');

const Book = require('../models/Book');
const books = require('../caches/book.cache');
const Base = require('./base.controller');

const createSchema = Joi.object({
  title: Joi.string()
    .min(5)
    .max(255)
    .required(),

  description: Joi.string(),
    
  author: Joi.string()
    .min(5)
    .max(255)
    .required(),

  pages: Joi.number()
    .min(5)
    .required(),

  price: Joi.number()
    .min(0.1),

  category: Joi.string()
});

class BookController extends Base {
  constructor(model) {
    super()
    this.model = model;
    router.get('/', books.cache, this.index);
    router.get('/:id',books.cache, this.get);
    router.post('/', this.validCreate, this.create);
  }
  
  validCreate = async (req, res, next) => {
    const valid = await createSchema.validateAsync(req.body)
    if (valid.error) {
      throw new ValidationError(valid.error.message)
    }

    const book = await this.model.Exists(req.body.title)
    if (book.length) {
      throw new ValidationError('Book Already Exists')
    }

    next()
  }
}

new BookController(Book);

module.exports = router;