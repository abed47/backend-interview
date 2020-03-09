const chai = require('chai');
const chaiJwt = require('chai-jwt');
const auth = require('../../routes/verifyToken');
const chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);
chai.use(chaiJwt);

//mock data to verify middleware
let req = {}
let res = {}

describe('MIDDLEWARE /verify Token',() => {
    it('it should return function next with extra headers',() => {

    })
})