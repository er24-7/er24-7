const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User')
const Department = require('../models/Department')

const passport = require('passport');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error', 'please login')
    res.redirect('back')
    // will need to figure out where to redirect
  }
}

/* GET user page */
router.get('/', ensureAuthenticated, (req, res, next) => {
  res.render('user-views/index');
});

router.get('/create', ensureAuthenticated, (req, res, next) => {
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

router.post('/create', ensureAuthenticated, (req, res, next) => {
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

router.get('/show/:id', ensureAuthenticated, (req, res, next) => {
  User.findById(req.params.id).populate('department')
    .then((theUser) => {
      res.render('user-views/show', { user: theUser })
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/edit/:id', ensureAuthenticated, (req, res, next) => {
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

router.post('/edit/:id', ensureAuthenticated, (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      req.flash('success', 'User successfully edited')
      res.redirect('/users/edit/' + req.params.id)
    })
    .catch((err) => {
      req.flash('error', 'Error, please try again')
      console.log(err)
      res.redirect('/users/edit/' + req.params.id)

      // })
    })
})

router.post('/delete/:id', ensureAuthenticated, (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      req.flash('success', 'User successfully deleted')
      res.redirect('/users/create')
    })
    .catch((err) => {
      next(err)
    })

})



// MOVE TO AUTH ROUTES

router.get('/login', (req, res, next) => {
  res.render('user-views/login');
})

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    // Redirect if it fails
    if (!user) { return res.redirect('/users/login'); }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      // Redirect if it succeeds
      return res.redirect('/users')
      // User.findById(user._id).populate('department')
      //   .then((theUser) => {
      //     if (theUser.role == "MAN") {
      //       return res.redirect('/departments/' + theUser.department.name)
      //     } else {
      //       return res.redirect('/users/show/' + theUser._id)

      //     }
      //   })
      //   .catch((err) => {
      //     return next(err)
      //   })
    });
  })(req, res, next);
});


router.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect("/users/login");
})


module.exports = router;