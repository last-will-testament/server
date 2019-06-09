const mongoose = require("mongoose");

const WillSchema = new mongoose.Schema({
    username: {type: String},
    contactNumber:{type: Number},
    contactEmail:{type: String},
})


const Will = mongoose.model("Will",WillSchema);

module.exports = Will;
