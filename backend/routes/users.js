const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const { check, validationResult } = require('express-validator');

let router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const db = require('../models/index');

const errorRes = require('../lib/errorRes');


// userpage
router.get('/', (req, res) => {
  // console.log(req.session.username);
  console.log(req.cookies.username);
  // if logged in
  if (req.session.username) {
    console.log(req.session.username);
    res.render('index', { title: 'hello' });
  } else {
    res.redirect('/users/login');
  }
});


// register {name, email, password, password_confirm}

const sendEmail = (req, res, next) => {
  next();
}

router.post('/register', [
  check('name').not().isEmpty().isAlphanumeric().isLength({min:5, max:50}),
  check('email').not().isEmpty().isEmail().custom((value, { req }) => {
    return db.Users.count({ where: { email: req.body.email } })
    .then(count => {
      if (count > 0) {
        throw new Error('already in use');
      }
    })
  }),
  check('password').not().isEmpty().isHash('sha256').custom((value, { req }) => {
    if (req.body.password !== req.body.password_confirm) {
      throw new Error('no');
    }
  })
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(422).json({ errors: errors.array() });
    res.status(422).json({ errors: errors.array().msg });
  }
  next();
},
sendEmail,
(req, res) => {
  const userdata = {
    'name': req.body.name,
    'email': req.body.email,
    'password': req.body.password
  };
  db.Users.create(userdata)
    .then(() => res.json({ result: true }))
   .catch(err => console.error(err.stack));
});


// login {email, password}

// router.get('/login', (req, res) => {
//   res.render('index', { title: 'login' });
// })

router.post('/login', [
  check('email').not().isEmpty().isEmail(),
  check('password').not().isEmpty().isHash('sha256')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(422).json({ errors: errors.array() });
    res.status(422).json({ error: errors.array().msg });
  }
  next();
}, async (req, res, next) => {
  const user = await db.Users.findOne({ where: { email: req.body.email } })
    .catch(err => {
      console.error(err.stack);
      res.status(401).json({ error: err.message });
    });

  // unregistered email 
  if (!user) {
    throw new Error('this email is not registered');
    // res.status(401).json({ error: 'this email is not registered' });
    // next();
    // res.end();
  }
  // incorrect password
  else if (req.body.password !== user.dataValues.password) {
    throw new Error('password is incorrect');
    // res.status(401).json({ error: 'password is incorrect' });
    // next();
    // res.end();
  }
  res.locals.username = user ? user.dataValues.name : null;

  next();
}, (req, res, next) => {
    // const username = user.dataValues.name;
    const username = res.locals.username;
    console.log(username);
    res.json(username)
//     req.session.regenerate(err => {
//       req.session.username = username;
//       req.session.save();
//       res.render('index', { title: req.session.username });
//       // console.log(req.session);
//       // res.redirect('/users/p');
//     });
});


// logout
router.get('/logout', function(req, res, next) {
  const username = req.session.username;
  console.log(req.session);
  res.render('index', { title: username });
});


module.exports = router;