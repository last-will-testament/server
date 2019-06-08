const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username:String,
    contactNumber:Number,
    contactEmail:String,
    will:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String,
        contactNumber:Number,
        contactEmail:String,
    },
    lawyer:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String,
        contactNumber:Number,
        contactEmail:String,

    }
    
});

const Users = mongoose.model('Users',UserSchema)

module.exports = Users;