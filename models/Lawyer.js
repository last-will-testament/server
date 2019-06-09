const mongoose = require("mongoose");

const LawyerSchema = new mongoose.Schema({
    lawyerName:String,
    lawyerNumber:Number,
    lawyerEmail:String,
})


const Lawyer = mongoose.model("Lawyer",LawyerSchema);

module.exports = Lawyer;