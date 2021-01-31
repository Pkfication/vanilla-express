const Base = require("./base.cache");

class Book extends Base {
  constructor() {
    super()
    this.prefix = 'books';
    this.expiry = 100
  }
}

module.exports = new Book();