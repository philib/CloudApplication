//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);

/*
 * Test the /GET route
 */
describe('/GET Answeer', function () {
    it('bot should respond', function(done) {
    chai.request(server)
        .get('/5915f8cd0dd894258039e48f/conversation?msg=test')
        .end( function(err, res) {
        res.should.have.status(200);
    done();
});
});

});