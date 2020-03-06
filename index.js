const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const auth = require('./routes/auth');

app.get('/uplaod',(req, res) => {
    
});

app.listen(3000, () => {
    console.log('server started');
})