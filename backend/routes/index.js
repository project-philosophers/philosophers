var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/post', (req, res) => {
  console.log('ok');
  res.send('hello, ' + req.body.name);
})


const philsContoroller = require(('./controllers/philosophers'));
router.use('/philosophers', philsContoroller);

const LitContoroller = require(('./controllers/literature'));
router.use('/literature', LitContoroller);

const tagsContoroller = require(('./controllers/tags'));
router.use('/tags', tagsContoroller);

module.exports = router;
