module.exports = class Auth{
    constructor(expressApp){
        this.router = expressApp.Router();
    }

    initRoutes(){
        this.router.get('/login',(req,res) => {
            res.send('login module')
        })

        this.router.post('/register',(req,res) => {
            res.send('register module');
        })
    }
    
}