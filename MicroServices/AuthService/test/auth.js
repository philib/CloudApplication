//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var tenantModel = require('../models/tenant');
var mongoose = require('mongoose');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);

/*
 * Test the /GET route
 */

describe('/POST Register', function () {
    it('login shoud succeed', function (done) {
        chai.request(server)
            .post('/register')
            .send({
                "name": "test",
                "password": "test"
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
});

describe('/POST Login', function () {
    it('login shoud succeed', function (done) {
        chai.request(server)
            .post('/login')
            .send({
                "name": "test",
                "password": "test"
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
});

describe('/POST Login', function () {
    it('login shoud fail', function (done) {
        chai.request(server)
            .post('/login')
            .send({
                "name": "test",
                "password": "tests"
            })
            .end(function (err, res) {
                tenantModel.remove({ name: "test" }, function (err) {
                    if (err) return handleError(err);
                });
                res.should.have.status(401);
                done();
            });
    });
});