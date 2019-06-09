const mongoose = require("mongoose");

const LawyerSchema = new mongoose.Schema({
    username: {type: String},
    contactNumber:{type: Number},
    contactEmail:{type: String},
})


const Lawyer = mongoose.model("Lawyer",LawyerSchema);
module.exports = Lawyer;
