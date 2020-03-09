const chai = require('chai');
const loginValidation = require('../validation').loginValidation;
const registerValidation = require('../validation').registerValidation;
const assert = chai.assert;
const expect = chai.expect;

//valid login inputs
let validLoginInputs = {
    user_name : "abed1996",//should be between 6 chars and 100, note empty, a string
    password: "123456"//should be between 6 chars and 100, note empty, a string
}

//valid register inputs
let validRegistrationInputs = {
    fullname : "abdull-rahman al haj hassan",//should be between 6 chars and 100, note empty, a string
    user_name : "test_username",//should be between 6 chars and 100, note empty, a string
    password: "testPasswrod",//should be between 6 chars and 100, note empty, a string
    date: "132467856316",//should be a valid timestamp
}
describe("VALIDATIONS",  () => {
    it('it should check if username and password are valid', async () => {
        let result = await loginValidation(validLoginInputs);
        assert.typeOf(result, 'object');
        expect(result).to.contain.property('value');
        expect(result).not.to.contain.property('error');
    })

    it('it should check if the user registration inputs match the required pattern', async () => {
        let result = await registerValidation(validRegistrationInputs);
        assert.typeOf(result, 'object')
        expect(result).to.contain.property('value');
        expect(result).not.to.contain.property('error');
    })
})