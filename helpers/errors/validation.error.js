class ValidationError extends Error {
  constructor(message = 'Validation Error') {
    super();
    this.statusCode = 400;
    this.message = message;
  }
}

module.exports = ValidationError