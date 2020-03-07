const User = new mongoose.Schema({
    name:{
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
        max: 60
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

module.exports = User;