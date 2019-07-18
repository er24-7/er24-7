const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

  firstName: String,
  lastName: String,
  password: String,
  email: { type: String, unique: true },
  phone: String,
  department: { type: Schema.Types.ObjectId, ref: "Department" },
  role: { type: String, enum: ["ADMIN", "MANAGER", "EMPLOYEE"], default: "EMPLOYEE" },
  // shifts: [{ type: Schema.Types.ObjectId, ref: "Shift" }]

})


const User = mongoose.model('User', userSchema);



module.exports = User;