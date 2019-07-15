const express = require('express');
const router = express.Router();
const User = require('../models/User')

/* GET user page */
router.get('/', (req, res, next) => {
  res.render('user-views/index');
});

router.get('/create', (req, res, next) => {
  res.render('user-views/create')
})

router.post('/create', (req, res, next) => {
  User.create(req.body)
    .then(() => {
      req.flash('success', 'User successfully created')
      res.redirect('/users')
    })
    .catch((err) => {
      req.flash('error', 'Error, please try again')
      console.log(err)
      res.redirect('/users/create')

    })
})

router.get('/login', (req, res, next) => {
  res.render('user-views/login');
})

router.post('/login', (req, res, next) => {
  res.redirect('/users');
})

// router.get('/employees', (req, res, next) => {
//   res.render('user-views/employee-list')
// })

// router.get('/employees/sample', (req, res, next) => {
//   res.render('user-views/employee-list')
// })


module.exports = router;