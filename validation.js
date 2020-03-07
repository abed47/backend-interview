const joy = require('@hapi/joi');

const registerValidation = async (data) => {
    const validationSchema = joy.object({
        fullname : joy.string().max(100).min(6).required(),
        user_name : joy.string().max(100).min(6).required(),
        password: joy.string().max(60).min(6).required(),
        date: joy.date(),
    });
    
    return await validationSchema.validate(data);
}

const loginValidation = async (data) => {
    const validationSchema = joy.object({
        user_name : joy.string().max(100).min(6).required(),
        password: joy.string().max(60).min(6).required(),
    });
    
    return await validationSchema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
