const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
        min: 6,
        max: 100
    },
    user_name:{
        type: String,
        required: true,
        min: 6,
        max: 100
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max: 100
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('users',userSchema);