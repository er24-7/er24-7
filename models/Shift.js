const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shiftSchema = new Schema({

  assigned: { type: Schema.Types.ObjectId, ref: "User" },
  code: String

})


const Shift = mongoose.model('Shift', shiftSchema);



module.exports = Shift;