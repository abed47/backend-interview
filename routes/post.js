const router = require('express').Router();
router.get('/',(req,res) => {
    res.json({
        posts:{
            title: "test",
            description: "test description"
        }
    })
})