var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// const philsContoroller = require(('./phils'));
// router.use('/phils', philsContoroller);


module.exports = router;
