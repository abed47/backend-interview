const User = require('../models/User');
const registerValidation = require('../validation');

class Auth{
    constructor(expressApp){
        this.router = expressApp.Router();
    }

    initRoutes(){
        this.router.post('/login',(req,res) => {
            res.send('login module')
        })

        this.router.post('/register', async (req,res) => {

            const {error} = await registerValidation(req.body);

            if(error) return res.status(400).send(error.details[0].message);

             const user = new User({
                 fullname: req.body.fullname,
                 user_name: req.body.user_name,
                 password: req.body.password,
                 date:req.body.date
             });

             try{
                 const addedUser = await user.save();
                 res.status(200).send(addedUser);
             }catch(err){
                 res.status(400).send(err);
             }
        })

        return this.router;
    }
    
}

module.exports = Auth;