const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Department = require('../models/Department')

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error', 'please login')
    res.redirect('/auth/login')
    // will need to figure out where to redirect
  }
}

function checkRoles(role) {
  return function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      req.flash('error', `you need to be an ${role} for that`)
      res.redirect('/users')
    }
  }
}

function checkRoles(role1, role2) {
  return function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === role1 || req.user.role == role2) {
      return next();
    } else {
      req.flash('error', `you need to be an admin or manager to access that area`)
      res.redirect('/users')
    }
  }
}

const checkAdmin = checkRoles('ADMIN');
const checkAdminOrManager = checkRoles('ADMIN', 'MANAGER');

router.get('/', checkAdmin, (req, res, render) => {
  Department.find().sort({ name: 1 })
    .then((allDepartments) => {
      res.render('department-views/all-departments', { departments: allDepartments })
    })
    .catch((err) => {
      next(err)
    })

})

router.get('/create', checkAdmin, (req, res, render) => {
  res.render('department-views/create-department')
})

router.post('/create', (req, res, render) => {
  Department.create(req.body)
    .then(() => {
      req.flash('success', 'Department successfully created')
      res.redirect('/departments')
    })
    .catch((err) => {
      req.flash('error', 'Error, please try again')
      console.log(err)
      res.redirect('/departments/create')

    })
})

router.get('/:deptName', ensureAuthenticated, (req, res, render) => {
  Department.findOne({ name: req.params.deptName })
    .then((theDepartment) => {
      User.find({ department: theDepartment._id }).sort({ firstName: 1 })
        .then((allUsers) => {
          res.render('department-views/one-department', { department: theDepartment, users: allUsers })
        })
        .catch((err) => {
          next(err)
        })
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/:deptName/edit', checkAdminOrManager, (req, res, render) => {
  Department.findOne({ name: req.params.deptName })
    .then((theDepartment) => {
      res.render('department-views/edit-one-department', { department: theDepartment })
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/:deptName/update', (req, res, render) => {
  console.log(req.body.name)
  Department.findOneAndUpdate({ name: req.params.deptName }, req.body)
    .then(() => {
      console.log('it did work-=-=-=-=-')
      req.flash('success', 'Department successfully updated')
      res.redirect('/departments/' + req.body.name)
    })
    .catch((err) => {
      console.log(err)
      next(err)
    })
})

router.post('/:deptName/delete', (req, res, render) => {
  Department.findOneAndDelete({ name: req.params.deptName })
    .then(() => {
      req.flash('success', 'Department successfully deleted')
      res.redirect('/departments')
    })
    .catch((err) => {
      next(err)
    })
})

// router.get('/:deptName/thisEmployee', (req, res, render) => {
//   res.render('department-views/one-employee')
// })




module.exports = router;