const express = require('express');
const router = express.Router();
const Department = require('../models/Department')

router.get('/', (req, res, render) => {
  res.render('department-views/all-departments')
})


router.get('/sampleDepartment', (req, res, render) => {
  res.render('department-views/one-department')
})

router.get('/create', (req, res, render) => {
  res.render('department-views/create-department')
})

router.post('/create', (req, res, render) => {
  req.flash('success', 'create button was called.  Good job!')
  res.redirect('/departments')
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