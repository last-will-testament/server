const mongoose = require("mongoose");

const WillSchema = new mongoose.Schema({
    username:String,
    contactNumber:Number,
    contactEmail:String,
})


const Will = mongoose.model("Will",WillSchema);

module.exports = Will;