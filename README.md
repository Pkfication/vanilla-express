# Vanilla Express
An Object Oriented express server, talking to MONGODB via `mongoose`, intercepted by redis caching middleware, bundled with a generic `CRUD` class which takes care of all new mongoose model's CRUD without writing CRUD operations. Beautifully designed controllers, which solves all the code repeatation problems. Beautifully designed Caches which handles all the operations asynchronously and centrally.

A Perfect Start up kit for any kind of Express API application.

## Getting Started
Before getting started, make sure you've the latest version of following:
- node
- redis
- mongodb

To get started just clone the repository and install the dependencies.
This vanilla-express includes:
- Joi (Request Validation)
- redis (Caching APIS)
- mongoose (ORM MongoDB)
- bluebird (promisigying redis operations)
- express-status-monitor (monitoring server)
- morgan (logging)

## Manual Installation

```bash
git clone git@github.com:Pkfication/vanilla-express.git
cd vanilla-express
```
Install the dependencies
```bash
npm install
```
Copy configs
```
cp .config_dev.json .config.json
```

## Table of Content

- [Features](#features)
- [Commands](#commands)
- [Project Structure](#project-structure)
- [Error Handling](#error-handling)
- [Validation](#validation)
- [Logging](#logging)
- [Linting](#linting)

## Features

- **ES9**: latest ECMAScript features
- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Testing**: unit and integration tests using [Jest](https://jestjs.io)
- **Error handling**: Object Oriented Error Handling, Very easy to extend custom errors
- **Process management**: advanced production process management using [PM2](https://pm2.keymetrics.io)
- **Code coverage**: using [coveralls](https://coveralls.io)
- **Code quality**: with [Codacy](https://www.codacy.com)
- **Git hooks**: with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)

## Commands

Running locally:

```bash
npm start
```

Running in production:

```bash
npm prod
```

Testing:

```bash
# run all tests
npm test


# run test coverage
npm coverage
```

## Project Structure

```
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--caches\         # Custom redis cache classes
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--helper\         # Utility classes and functions
 |--app.js          # Express app
 |--bin/www         # App entry point
```

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`). For convenience, you can also wrap the controller inside the catchAsync utility wrapper, which forwards the error.

```javascript
# Custom Not Found Error
class NotFoundError extends Error {
  constructor(message = 'Not Found') {
    super();
    this.message = message;
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;

# Picks up the status codes and messages automatically
const resource = await this.model.findById(req.params.id)
      .orFail(new NotFoundError());
```

```json
{
    "status": "error",
    "statusCode": 404,
    "message": "Not Found"
}
```
This Custom Error Handlers are available globally and can be used from anywhere within the project.


## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `constrollers` directory and are used in the routes by providing them as parameters to the `validate` middleware.

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) with some modifications. It also extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off all rules that are unnecessary or might conflict with Prettier.

To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier configuration, update the `.prettierrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.

To maintain a consistent coding style across different IDEs, the project contains `.editorconfig`

