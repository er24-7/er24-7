const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

  firstName: String,
  lastName: String,
  password: String,
  email: { type: String, unique: true },
  phone: String,
  role: { type: String, enum: ["MAN", "EMP"] }

})


const User = mongoose.model('User', userSchema);



module.exports = User;