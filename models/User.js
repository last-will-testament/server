const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username:String,
    userNumber:Number,
    userEmail:String,   
});

const Users = mongoose.model('Users',UserSchema)

module.exports = Users;