const express = require('express');
const router = express.Router();

router.get('/', (req, res, render) => {
  res.render('department-views/index')
})




module.exports = router;