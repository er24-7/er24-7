const express = require('express');
const router = express.Router();
const Department = require('../models/Department')

router.get('/', (req, res, render) => {
  Department.find()
    .then((allDepartments) => {
      res.render('department-views/all-departments', { departments: allDepartments })
    })
    .catch((err) => {
      next(err)
    })

})

router.get('/create', (req, res, render) => {
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

router.get('/:deptName', (req, res, render) => {
  Department.findOne({ name: req.params.deptName })
    .then((theDepartment) => {
      res.render('department-views/one-department', { department: theDepartment })
    })
    .catch((err) => {
      next(err)
    })
})



router.get('/sampleDepartment/edit', (req, res, render) => {
  res.render('department-views/edit-one-department')
})

router.post('/sampleDepartment/update', (req, res, render) => {
  req.flash('success', 'update button was called.  Good job!')
  res.redirect('/departments')
})

router.post('/sampleDepartment/delete', (req, res, render) => {
  req.flash('success', 'delete button was called.  Good job!')
  res.redirect('/departments')
})

router.get('/sampleDepartment/thisEmployee', (req, res, render) => {
  res.render('department-views/one-employee')
})




module.exports = router;