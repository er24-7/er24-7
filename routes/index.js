const express = require('express');
const router = express.Router();
const User = require('../models/User')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/test', (req, res, next) => {
  res.send(req.session.passport.user)
})

router.post('/to-department', (req, res, next) => {
  User.findById(req.user.id).populate('department')
    .then((theUser) => {
      if (req.user.role == "ADMIN") {
        res.redirect('/departments')
      } else {
        res.redirect('/departments/' + theUser.department.name)
        // res.redirect('/users/show/' + theUser._id)
      }
    })
    .catch((err) => {
      next(err);
    })
})

router.post('/to-profile', (req, res, next) => {
  User.findById(req.user.id).populate('department')
    .then((theUser) => {
      res.redirect('/users/show/' + theUser._id)
    })
    .catch((err) => {
      next(err);
    })
})

module.exports = router;
