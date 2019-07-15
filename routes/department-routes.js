const express = require('express');
const router = express.Router();

router.get('/', (req, res, render) => {
  res.render('department-views/all-departments')
})


router.get('/sampleDepartment', (req, res, render) => {
  res.render('department-views/one-department')
})

router.get('/sampleDepartment/thisEmployee', (req, res, render) => {
  res.render('department-views/one-employee')
})




module.exports = router;