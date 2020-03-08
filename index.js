const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Import Routes
const auth = require('./routes/auth');
const postsRoute = require('./routes/post');
const viewRoutes = require('./routes/viewsRoutes');

//dot env init
dotenv.config();


//db connection init
mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true,
        useNewUrlParser: true }
    ,() => {console.log("connected to db");}
    );

//init auth routes
const authRoutes = new auth(express);

//adding json to express
app.use(express.json());

//middilewre for post routes
app.use('/api/posts',postsRoute);

/**
 * creates middleware for the auth route
 * 
 * @param - middleware
 * 
 * @param - routes init from auth class
 * 
 */
app.use('/api/user',authRoutes.initRoutes())

//add view routes to the app
app.use(viewRoutes);


app.listen(3000, () => {
    console.log('server started');
})