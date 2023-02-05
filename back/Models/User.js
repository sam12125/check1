const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    country:{
        type:String,
        required:false,
        trim:true,
    },
    state:{
        type:String,
        required:false,
        trim:true,
    },
    city:{
        type:String,
        required:false,
        trim:true,
    },
    carType:{
        type:String,
        required:false,
        trim:true,
    },
    carModel:{
        type:String,
        required:false,
        trim:true,
    },

})

const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel