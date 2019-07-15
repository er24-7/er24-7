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

router.get('/:deptName/edit', (req, res, render) => {
  Department.findOne({ name: req.params.deptName })
    .then((theDepartment) => {
      res.render('department-views/edit-one-department', { department: theDepartment })
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/:deptName/update', (req, res, render) => {
  Department.findOneAndUpdate({ name: req.params.deptName }, req.body)
    .then(() => {
      req.flash('success', 'Department successfully updated')
      res.redirect('/departments/' + req.params.deptName)
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/:deptName/delete', (req, res, render) => {
  Department.findOneAndDelete({ name: req.params.deptName })
    .then(() => {
      req.flash('success', 'Department successfully delete')
      res.redirect('/departments')
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/:deptName/thisEmployee', (req, res, render) => {
  res.render('department-views/one-employee')
})




module.exports = router;