const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username:String,
    contactNumber:Number,
    contactEmail:String,   
});

const Users = mongoose.model('Users',UserSchema)

module.exports = Users;