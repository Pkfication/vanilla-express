var express = require('express');
var router = express.Router();

const Base = require("./base.controller");

class AppController extends Base {
  constructor() {
    super();
    router.get('/health', this.health);
  }

  health = (req, res) => {
    res.send(200)
  }
}

new AppController();

module.exports = router;