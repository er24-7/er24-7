const express = require('express');
const router = express.Router();
const Shifts = require('../models/Shift');
const User = require('../models/User')
const Department = require('../models/Department')
const moment = require('moment');
moment().format()

/* GET shifts page*/
router.get('/:deptName', (req, res, next) => {
  Department.findOne({ name: req.params.deptName })
    .then((theDepartment) => {
      // res.send(theDepartment._id)
      User.find({ department: theDepartment._id })
        .then((allUsers) => {
          currentDate = moment();
          res.render('shift-views/create-shift', { users: allUsers, department: theDepartment, date: currentDate });
        })
        .catch((err) => {
          next(err)
        })
    })
    .catch((err) => {
      next(err)
    })
  // res.send(moment())
});

router.post('/create', (req, res, next) => {
  Shifts.create(req.body)
    .then(() => {
      req.flash('success', 'shift added')
      res.redirect('/users')
    })
    .catch((err) => {
      next(err)
    })
  // res.send(moment())
});











// router.get('/api', (req, res, next) => {

//   Shifts.find()
//     .then((listOfShifts) => {
//       res.json(listOfShifts);
//     })
//     .catch((err) => {
//       next(err);
//     })
// })

// router.post('/api', (req, res, next) => {
//   let assigned = req.body.assigned;
//   let start = req.body.start;
//   let end = req.body.end;

//   Shifts.create({
//     assigned: assigned,
//     start: start,
//     end: end
//   })
//     .then((response) => {
//       // res.json(); // in case message doesn't work
//       res.json({ message: 'Successfully creted a shift!' });
//     })
//     .catch((err) => {
//       res.json(err);
//     })
// })


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




