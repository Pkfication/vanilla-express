class ServerError extends Error {
  constructor(message = 'Internal Server Error') {
    super();
    this.statusCode = 500;
    this.message = message;
  }
}

module.exports = ServerError