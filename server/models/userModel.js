const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        min: 3,
        max: 8,
        unique: true,
        required: true
    },
    email:{
        type: String,
        max: 50,
        unique: true,
        required: true
    },
    password:{
        type: String,
        max: 8,
        required: true

    }
})
module.exports = mongoose.model("Users", userSchema);