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
