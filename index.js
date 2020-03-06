const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
{ useUnifiedTopology: true }
,() => {
    console.log('connected to db');
})

/**
 * @import routes
 */
const authRoute = require('./routes/auth');

/**
 * creating router middleware
 */
app.use('/api/user',authRoute);

app.listen(3000,() => console.log('server started'));