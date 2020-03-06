const express = require('express');
const app = express();

/**
 * @import routes
 */
const authRoute = require('./routes/auth');

/**
 * creating router middleware
 */
app.use('/api/user',authRoute);

app.listen(3000,() => console.log('server started'));