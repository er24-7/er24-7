const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Department = require('../models/Department')
const bcrypt = require('bcryptjs');
const passport = require('passport');


router.get('/create', (req, res, next) => {
  Department.find()
    .then((allDepartments) => {
      User.find()
        .then((allUsers) => {
          res.render('user-views/create', { users: allUsers.reverse(), departments: allDepartments })

        })
        .catch((err) => {
          next(err)
        })

    })
    .catch((err) => {
      next(err)
    })
})

router.post('/create', (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  const department = req.body.department;
  const role = req.body.role;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  User.create({

    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    phone: phone,
    department: department,
    role: role
  })
    .then(() => {
      req.flash('success', 'User successfully created')
      res.redirect('/auth/create')
    })
    .catch((err) => {
      req.flash('error', 'Error, please try again')
      console.log(err)
      res.redirect('/auth/create')

    })
})


router.get('/login', (req, res, next) => {
  res.render('user-views/login');
})

router.get('/login/demo', (req, res, next) => {
  demoUser = {
    email: 'demo@er24-7.com',
    password: 'demo'
  }
  res.render('user-views/login', { demo: demoUser });
})

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    // Redirect if it fails
    if (!user) {
      req.flash('error', 'Username or Password is incorrect.  Please try again')
      return res.redirect('/auth/login');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/users/')
    });
  })(req, res, next);
});




router.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect("/");
})



module.exports = router;
