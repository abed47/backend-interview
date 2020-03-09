const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access denied!');

    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = verified;
        res.header('auth-token');
        next();
    }catch(err){
        res.status(400).send("Access denied");
    }
}

module.exports = auth;