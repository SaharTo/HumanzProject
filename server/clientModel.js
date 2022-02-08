const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    fullName:String,
    clientId:String,
    ipAdress:String,
    phoneNumber:String
    
})

module.exports = mongoose.model("Client", clientSchema);