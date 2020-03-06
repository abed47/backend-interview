const express = require('express');
const app = express();
const auth = require('./routes/auth');

app.get('/uplaod',(req, res) => {
    res.send(a.getName());
});

app.listen(3000, () => {
    console.log('server started');
})