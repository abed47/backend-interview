const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const chaiJwt = require('chai-jwt');

chai.use(chaiHttp)
chai.use(chaiJwt)
const expect = chai.expect;
/*
describe('POST /api/user/register', () => {
    it('it should register a new user', done => {
        chai.request(app).post('/api/user/register')
        .send({fullname: "test full name",user_name: "testusamedsd155",password:"testpassword",date: "1583704927"})
        .then(res => {
            const body = res.body;
            expect(body).to.contain.property('_id');
            expect(body).to.contain.property('date');
            expect(body).to.contain.property('fullname');
            expect(body).to.contain.property('user_name');
            expect(body).to.contain.property('password');
            expect(body).to.contain.property('__v');
            done();
        })
        .catch(err => {
            done(err);
        })
    });
});
*/
describe('POST /api/user/login',() => {
    it('it should login and return auth token', done => {
        chai.request(app)
        .post('/api/user/login')
        .send({user_name: "abed1996",password: "123456"})
        .then(res => {
            const body = res.text;
            const headers = res.header;
            expect(body).to.contain.string('logged in')
            expect(headers).to.contain.property('auth-token')
            expect(headers['auth-token']).to.be.a.jwt
            done();
        }).catch(err => {
            done(err);
        })
    })
})

describe('POST /api/user/resize',() => {
    it('it should return an image attachment', () => {
        chai.request(app)
        .post('/api/user/resize')
        .send({imgUrl: "https://miro.medium.com/max/2400/1*LSYdlwkdqEQSA-p19HGF7Q.jpeg"})
        .set('auth-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTYzYzY3NzJlM2Q5YjUxM2M3OTljNTEiLCJpYXQiOjE1ODM2MTY2Nzh9.1krVfXNEysdjrI_AauMCjFnNHB-yt5LAFkOxPB1M9DE')
        .then(res => {
            expect(res).to.have.status(200);
            expect(res.header['Content-Type']).to.be.eql('image/png')
            done()
        }).catch(err => {
            done(err)
        })
    })
})