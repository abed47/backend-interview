const User = require('../models/User');
const joy = require('@hapi/joi');

const validationSchema = joy.object({
    fullname : joy.string().max(100).min(6).required(),
    user_name : joy.string().max(100).min(6).required(),
    password: joy.string().max(60).min(6).required(),
    date: joy.date(),
});
class Auth{
    constructor(expressApp){
        this.router = expressApp.Router();
    }

    initRoutes(){
        this.router.post('/login',(req,res) => {
            res.send('login module')
        })

        this.router.post('/register', async (req,res) => {

           const {error} = await validationSchema.validate(req.body)
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