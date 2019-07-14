const express = require('express');
const router = express.Router();
const Shifts = require('../models/Shift');

/* GET shifts page*/
router.get('/', (req, res, next) => {
  res.render('shift-views/index');
});


router.get('/api', (req, res, next)=>{

  Shifts.find()
  .then((listOfShifts)=>{
    res.json(listOfShifts);
  })
  .catch((err)=>{
    next(err);
  })
})

router.post('/api', (req, res, next)=>{
  let assigned = req.body.assigned;
  let start = req.body.start;
  let end = req.body.end;

  Shifts.create({
    assigned: assigned,
    start: start,
    end: end
  })
  .then((response)=>{
    // res.json(); // in case message doesn't work
    res.json({message: 'Successfully creted a shift!'});
  })
  .catch((err)=>{
    res.json(err);
  })
})


//?????????????????
// router.post('/', (req, res, next)=>{
//   const newShift = new Shifts(req.body);
//   newShift.save()
//   .then(()=>{
//     req.flash('error', "✓");
//     res.redirect('/shifts');
//   })
//   .catch((err)=>{
//     res.redirect('/celebrities/new');
//     next(err);
//   })
// })











module.exports = router;




