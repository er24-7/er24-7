const express = require('express');
const router = express.Router();
const Shifts = require('../models/Shift');
const User = require('../models/User')
const Department = require('../models/Department')
const moment = require('moment');
moment().format()

/* GET shifts page*/
router.get('/:deptName', (req, res, next) => {
  let theDays = {
    su: "Sunday",
    mo: "Monday",
    tu: "Tuesday",
    we: "Wednesday",
    th: "Thursday",
    fr: "Friday",
    sa: "Saturday"
  }
  let theShift = ['9am-5pm', '5pm-1am', '1am-9am']
  Department.findOne({ name: req.params.deptName })
    .then((theDepartment) => {
      User.find({ department: theDepartment._id }).populate("shifts")
        .then((allUsers) => {
          Shifts.find({ assigned: allUsers }).populate('assigned')
            .then((allShiftsWithinDepartment) => {

              allShiftsWithinDepartment.forEach((eachShift) => {
                eachShift.codes = eachShift.codes.map((eachCode) => {
                  let sec1 = eachCode.slice(0, 2)
                  let sec2 = eachCode.slice(2)
                  return (`${theDays[sec1]}, ${theShift[sec2 - 1]}`)
                })
              })
              res.render('shift-views/create-shift', { users: allUsers, department: theDepartment, shifts: allShiftsWithinDepartment.reverse() });
            })
            .catch((err) => {
              next(err)
            })
        })
        .catch((err) => {
          next(err)
        })
    })
    .catch((err) => {
      next(err)
    })
});

router.post('/:deptName/create', (req, res, next) => {
  Shifts.findOne({ assigned: req.body.assigned })
    .then((theCreatedShift) => {
      if (theCreatedShift == null) {
        Shifts.create(req.body)
          .then(() => {
            req.flash('success', 'shift added')
            res.redirect('/shifts/' + req.params.deptName)
          })
          .catch(() => {
            req.flash('error', 'code incorrect')
            res.redirect('/shifts/' + req.params.deptName)
          })
      } else {
        let theUpdatedShifts = theCreatedShift.codes;
        let theCurrentShifts = req.body.codes;
        if (typeof theCurrentShifts === "string") {
          if (!(theUpdatedShifts.includes(theCurrentShifts))) {
            theUpdatedShifts.push(theCurrentShifts)
          }
        } else {
          for (let i = 0; i < theCurrentShifts.length; i++) {
            if (!(theUpdatedShifts.includes(theCurrentShifts[i]))) {
              theUpdatedShifts.push(theCurrentShifts[i])
            }
          }
        }
        let theDaySorter = {
          su: 1,
          mo: 2,
          tu: 3,
          we: 4,
          th: 5,
          fr: 6,
          sa: 7
        }
        theUpdatedShifts.sort((a, b) => {
          if (theDaySorter[a.slice(0, 2)] > theDaySorter[b.slice(0, 2)]) {
            return 1;
          } else if (theDaySorter[a.slice(0, 2)] < theDaySorter[b.slice(0, 2)]) {
            return -1;
          } else if (a.slice(2) < b.slice(2)) {
            return -1;
          } else {
            return 1;
          }
        })
        Shifts.findByIdAndUpdate(theCreatedShift.id, {
          assigned: req.body.assigned,
          codes: theUpdatedShifts
        })
          .then(() => {
            req.flash('success', 'shift updated')
            res.redirect('/shifts/' + req.params.deptName)
          })
          .catch(() => {
            req.flash('error', 'code incorrect')
            res.redirect('/shifts/' + req.params.deptName)

          })

      }
    })
});


router.post('/:deptName/delete/all', (req, res, next) => {
  Shifts.deleteMany()
    .then(() => {
      req.flash('success', 'shifts deleted')
      res.redirect('/shifts/' + req.params.deptName)
    })
    .catch((err) => {
      next(err)
    })

})


router.post('/delete/:id', (req, res, next) => {
  Shifts.findByIdAndDelete(req.params.id)
    .then((theShift) => {
      User.findById(theShift.assigned).populate('department')
        .then((theUser) => {
          res.redirect('/shifts/' + theUser.department.name)

        })
        .catch((err) => {
          next(err)
        })
    })
    .catch((err) => {
      next(err)
    })
})


module.exports = router;




