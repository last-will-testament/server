const mongoose = require("mongoose");

const LawyerSchema = new mongoose.Schema({
    username:String,
    contactNumber:Number,
    contactEmail:String,
})


const Lawyer = mongoose.model("Lawyer",LawyerSchema);

module.exports = Lawyer;