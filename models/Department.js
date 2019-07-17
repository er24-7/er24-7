const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({

  name: { type: String, unique: true, required: true },
  manager: String, //will be userID
  listOfEmployees: Array //will be list of userIDs

})


const Department = mongoose.model('Department', departmentSchema);



module.exports = Department;