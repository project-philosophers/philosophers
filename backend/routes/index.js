var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/name', (req, res) => {
  const name = req.body.name;
  res.send(name);
});

const db = require('../models/index');
router.get('/read', (req, res) => {
  db.Philosophers.findAll()
    // .then(phils => res.send(JSON.stringify(phils.map(ph => ph.dataValues))))
    .then(phils => res.json(phils.map(ph => ph.dataValues)))
    .catch(err => console.error(err.stack));
});

module.exports = router;
