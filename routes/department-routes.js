const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Department = require('../models/Department')

function checkRoles(role) {
  return function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      req.flash('error', 'you need to be an admin for that')
      res.redirect('/auth/login')
    }
  }
}

const checkAdmin = checkRoles('ADMIN');

router.get('/', checkAdmin, (req, res, render) => {
  Department.find()
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

router.post('/create', checkAdmin, (req, res, render) => {
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

router.get('/:deptName', checkAdmin, (req, res, render) => {
  Department.findOne({ name: req.params.deptName })
    .then((theDepartment) => {
      User.find({ department: theDepartment._id })
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

router.get('/:deptName/edit', checkAdmin, (req, res, render) => {
  Department.findOne({ name: req.params.deptName })
    .then((theDepartment) => {
      res.render('department-views/edit-one-department', { department: theDepartment })
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/:deptName/update', checkAdmin, (req, res, render) => {
  Department.findOneAndUpdate({ name: req.params.deptName }, req.body)
    .then(() => {
      req.flash('success', 'Department successfully updated')
      res.redirect('/departments/' + req.params.deptName)
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/:deptName/delete', checkAdmin, (req, res, render) => {
  Department.findOneAndDelete({ name: req.params.deptName })
    .then(() => {
      req.flash('success', 'Department successfully delete')
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