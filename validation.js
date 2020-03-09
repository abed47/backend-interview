const joy = require('@hapi/joi');

/**
 * 
 * async function to validate user input
 * 
 * @param {*} data - data needed to be validated
 * 
 * @returns Joi object should only contain vlues, and error property if any error
 * 
 */
const registerValidation = async (data) => {
    const validationSchema = joy.object({
        //validation patterns
        fullname : joy.string().max(100).min(6).required(),
        user_name : joy.string().max(100).min(6).required(),
        password: joy.string().max(100).min(6).required(),
        date: joy.date(),
    });
    
    return await validationSchema.validate(data);
}

/**
 * 
 * async function to validate user input
 * 
 * @param {*} data - data needed to be validated
 * 
 * @returns Joi object should only contain vlues, and error property if any error
 * 
 */
const loginValidation = async (data) => {
    const validationSchema = joy.object({
        //validation patterns
        user_name : joy.string().max(100).min(6).required(),
        password: joy.string().max(60).min(6).required(),
    });
    
    return await validationSchema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
