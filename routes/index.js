var applicationRouter = require("../controllers/app.controller")
var booksRouter = require("../controllers/book.controller");

module.exports = function(app) {
  app.use("/", applicationRouter);
  app.use("/books", booksRouter);
};