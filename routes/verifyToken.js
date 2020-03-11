const jwt = require('jsonwebtoken');

/**
 * 
 * request object should contain auth-token header in order for the
 * request to be successful
 * 
 * @param {object} req - request object
 * @param {object} res - response body
 * @param {Function} next - callback function
 * 
 * @callback next() if request is valid
 * 
 * @returns {void}
 */
function auth(req,res,next){
    //assigning auth-token to a variable
    const token = req.header('auth-token');

    //return the function if token is not provided
    if(!token) return res.status(401).send('Access denied!');

    try{
        //constant is true if the token is valid
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);

        //adding headers
        res.header('auth-token',token);
        res.header('user',verified);
        
        //callback
        next();
    }catch(err){
        //throw error and prevent access if token is not valid
        res.status(400).send("Access denied");
    }
}

module.exports = auth;