var express = require('express');
var router = express.Router();

/* GET users listing. */
const auth = function(req, res, next) {
  res.send('respond with a resource');
};

module.exports = auth;
