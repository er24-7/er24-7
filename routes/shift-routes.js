const express = require('express');
const router = express.Router();

/* GET shifts page*/
router.get('/', (req, res, next) => {
  res.render('shift-views/index');
});

module.exports = router;