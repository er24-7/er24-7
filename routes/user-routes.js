const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User')
const Department = require('../models/Department')

const passport = require('passport');


/* GET user page */
router.get('/', (req, res, next) => {
  res.render('user-views/index');
});

router.get('/create', (req, res, next) => {
  Department.find()
    .then((allDepartments) => {
      User.find()
        .then((allUsers) => {
          res.render('user-views/create', { users: allUsers, departments: allDepartments })

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
      res.redirect('/users/create')
    })
    .catch((err) => {
      req.flash('error', 'Error, please try again')
      console.log(err)
      res.redirect('/users/create')

    })
})

router.get('/show/:id', (req, res, next) => {
  User.findById(req.params.id).populate('department')
    .then((theUser) => {
      res.render('user-views/show', { user: theUser })
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/edit/:id', (req, res, next) => {
  Department.find()
    .then((allDepartments) => {
      User.findById(req.params.id).populate('department')
        .then((theUser) => {
          res.render('user-views/edit', { user: theUser, departments: allDepartments })
        })
        .catch((err) => {
          next(err)
        })
    })
    .catch((err) => {
      next(err)
    })

})

router.post('/edit/:id', (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      req.flash('success', 'User successfully edited')
      res.redirect('/users/show/' + req.params.id)
    })
    .catch((err) => {
      req.flash('error', 'Error, please try again')
      console.log(err)
      res.redirect('/users/edit/' + req.params.id)

      // })
    })
})

router.post('/delete/:id', (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      req.flash('success', 'User successfully deleted')
      res.redirect('/users/create')
    })
    .catch((err) => {
      next(err)
    })

})

router.get('/login', (req, res, next) => {
  res.render('user-views/login');
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/users",
  failureRedirect: "/users/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect("/users/login");
})


module.exports = router;