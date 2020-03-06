const express = require('express');
const app = express();


app.get('/uplaod',(req, res) => {
    res.send('hello');
});

app.listen(3000, () => {
    console.log('server started');
})