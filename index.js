const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true,
        useNewUrlParser: true }
    ,() => {console.log("connected to db");}
    );


const authRoutes = new auth(express);
app.use(express.json());

/**
 * creates middleware for the auth route
 * 
 * @param - middleware
 * 
 * @param - routes init from auth class
 * 
 */
app.use('/api/user',authRoutes.initRoutes())


app.listen(3000, () => {
    console.log('server started');
})