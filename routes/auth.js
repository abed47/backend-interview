const User = require('../models/User');
class Auth{
    constructor(expressApp){
        this.router = expressApp.Router();
    }

    initRoutes(){
        this.router.post('/login',(req,res) => {
            res.send('login module')
        })

        this.router.post('/register', async (req,res) => {
            const user = new User({
                name: req.body.fullname,
                user_name: req.body.user_name,
                password: req.body.password,
                date:req.body.date
            });

            try{
                const addedUser = await user.save();
                res.send(addedUser);
            }catch(err){
                res.status(400).send(err);
            }
        })

        return this.router;
    }
    
}

module.exports = Auth;