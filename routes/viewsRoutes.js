const router = require('express').Router();

router.get('/',(req,res) => {
    res.status(200).render('index');
})

router.get('/login',(req,res) => {
    res.status(200).render('login');
})

router.get('/register',(req,res) => {
    res.status(200).render('register');
})

router.get('/home',(req,res) => {
    res.status(200).render('home')
})
module.exports = router;