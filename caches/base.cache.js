const redis = require('redis')
const { promisifyAll } = require('bluebird');

const client = redis.createClient({
  prefix: 'book_service:'
});
promisifyAll(redis);
client.on('error', (err) => {
  console.log("Error " + err)
});

class Base {
  constructor() {}

  get = async (key) => {
    return await client.getAsync(this.keyPrefix(key))
  }

  set = async (key, value) => {
    return await client.setexAsync(this.keyPrefix(key), this.expiry || 3600, value)
  }

  remove = async (key) => {
    await client.delAsync(this.keyPrefix(key))
  }

  keyPrefix = (key) => {
    return this.prefix ? 
      `${this.prefix}:${key}` : 
        `${key}`
  }

  cache = async (req, res, next) => {
    if (req.method != "GET") next();
    
    const key = req.originalUrl;
    const resource = await this.get(key);
    if (resource) {
      const parsedResponse = this.parseResponse(resource)
      res.status(200).json(this.parseResponse(parsedResponse));
    } else {
      res.sendResponse = res.send;
      res.send = async (body) => {
        await this.set(key, JSON.stringify(body));
        res.sendResponse(body);
      }
      next();
    }
  }

  parseResponse = (response) => {
    try {
      return JSON.parse(response)
    } catch(err) {
      throw new ServerError('Error Parsing the cached response');
    }
  }
}

module.exports = Base;