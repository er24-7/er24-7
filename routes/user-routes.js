const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Department = require('../models/Department')

/* GET user page */
router.get('/', (req, res, next) => {
  res.render('user-views/index');
});

router.get('/create', (req, res, next) => {
  Department.find()
    .then((allDepartments) => {
      res.render('user-views/create', { departments: allDepartments })

    })
    .catch((err) => {
      next(err)
    })
})

router.post('/create', (req, res, next) => {
  User.create(req.body)
    .then(() => {
      req.flash('success', 'User successfully created')
      res.redirect('/departments')
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
      res.redirect('/departments/sampleDepartment/thisEmployee')
    })
    .catch((err) => {
      req.flash('error', 'Error, please try again')
      console.log(err)
      res.redirect('/users/edit/' + req.params.id)

      // })
    })

  router.post('/delete/thisEmployee', (req, res, next) => {
    req.flash('success', 'User successfully deleted')
    res.redirect('/departments')
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