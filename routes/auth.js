const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const axios = require('axios');
const Fs = require('fs');
const Path = require('path');
const Jimp = require('jimp');
const verifyToken = require('./verifyToken');
dotenv.config();

class Auth{
    constructor(expressApp){
        this.router = expressApp.Router();
    }

    initRoutes(){
        this.router.post('/login', async (req,res) => {
            /**
             * 
             * validation user inputs
             * 
             * @param - request body
             * 
             * @returns - error object with details and message
             * 
             */
            const {error} = await loginValidation(req.body);
            if(error) return res.status(400).send(error.details[0].message);

            /**
             * 
             * check if user exists in the database
             * 
             * @param - condition
             * 
             * @returns - login response
             * 
             */
            const user = await User.findOne({user_name: req.body.user_name})
            if(!user) return res.status(400).send('User Does not exist');

            /**
             * 
             * check if the password matches
             * 
             * @params - retrieved password - user input
             * 
             */
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(!validPassword) return res.status(400).send('Invalid password');

            //creating and signing tocken
            const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
            res.header('auth-token',token)
            res.status(200).send("logged in");
        });

        this.router.post('/register', async (req,res) => {

            /**
             * 
             * validation user inputs
             * 
             * @param - request body
             * 
             * @returns - error object with details and message
             * 
             */
            const {error} = await registerValidation(req.body);
            if(error) return res.status(400).send(error.details[0].message);

            /**
             * 
             * check if user exists in the database and returns the functions
             * 
             * @param - condition
             * 
             * @returns - boolean
             * 
             */
            const userExists = await User.findOne({user_name: req.body.user_name})
            if(userExists) return res.status(400).send("username already exists");

            /**
             * 
             * hashing password
             * 
             */
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password,salt);

             const user = new User({
                 fullname: req.body.fullname,
                 user_name: req.body.user_name,
                 password: hashedPassword,
                 date:req.body.date
             });

             try{
                 const addedUser = await user.save();
                 res.status(200).send(addedUser);
             }catch(err){
                 res.status(400).send(err);
             }
        });

        this.router.post('/resize', verifyToken, async (req,res) => {
            const url = req.body.imgUrl
            const imgName = new Date().getTime().toString()
            const path = Path.resolve(__dirname, '../images', imgName+'.png')
            const writer = Fs.createWriteStream(path)
            axios.get(url,{responseType: 'stream'}).then( response => {
                response.data.pipe(writer)
                writer.on('open', () => {console.log('writing')})
                writer.on('close', () => onWritingDone(res,path))
            }).catch(err => {
                res.send(err)
            }) 
        });

        function onWritingDone(res,path){
            let newImgName = new Date().getTime().toString() +"150x150.png"
            const imgPath = Path.resolve(__dirname, '../images',newImgName);
            Jimp.read(path)
            .then(img => {
                img.resize(256, 256) // resize
                .quality(60) // set JPEG quality
                .write('images/'+newImgName); // save
                let rs = Fs.createReadStream(imgPath)
                res.attachment(newImgName)
                rs.pipe(res)
                res.status(200);
            }).catch(err =>{
                console.log(err)
            })
        }

        return this.router;
    }
    
}

module.exports = Auth;