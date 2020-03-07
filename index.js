const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const auth = require('./routes/auth');

const authRoutes = new auth(express);

app.use('/api/user',authRoutes.initRoutes())

app.use(express.json());

app.listen(3000, () => {
    console.log('server started');
})