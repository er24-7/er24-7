const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shiftSchema = new Schema({

  start: Date,
  end: Date,
  assigned: String // just the name (replace with ID on next version)

})


const Shift = mongoose.model('Shift', shiftSchema);



module.exports = Shift;