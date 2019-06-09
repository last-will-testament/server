const mongoose = require("mongoose");

const WillSchema = new mongoose.Schema({
    kinName:String,
    kinNumber:Number,
    kinEmail:String,
    description:String,
})


const Will = mongoose.model("Will", WillSchema);

module.exports = Will;
