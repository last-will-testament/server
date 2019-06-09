const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  username: {type: String},
  contactNumber:{type: Number},
  contactEmail:{type: String},
});

const Users = mongoose.model('Users',UserSchema)

module.exports = Users;
