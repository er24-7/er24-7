const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const passport = require('passport');

// MOVE TO AUTH ROUTES

router.get('/login', (req, res, next) => {
  res.render('user-views/login');
})

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    // Redirect if it fails
    if (!user) { return res.redirect('/auth/login'); }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.redirect('/users/')
    });
  })(req, res, next);
});


router.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect("/auth/login");
})



module.exports = router;
