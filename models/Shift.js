const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shiftSchema = new Schema({

  assigned: { type: Schema.Types.ObjectId, ref: "User" },
  // codes: [{
  //   type: String, enum: [
  //     "su1", "su2", "su3",
  //     "mo1", "mo2", "mo3",
  //     "tu1", "tu2", "tu3",
  //     "we1", "we2", "we3",
  //     "th1", "th2", "th3",
  //     "fr1", "fr2", "fr3",
  //     "sa1", "sa2", "sa3",
  //   ]
  // }]
  codes: [{ type: String }]

})


const Shift = mongoose.model('Shift', shiftSchema);



module.exports = Shift;