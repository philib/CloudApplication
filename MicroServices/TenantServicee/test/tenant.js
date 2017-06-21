//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var tenantModel = require('../models/tenant');
var mongoose = require('mongoose');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();
var jwt = require('jsonwebtoken')
var config = require('config');
var jwt_secret = config.JWTSecret
chai.use(chaiHttp);

var tenant = new tenantModel();
tenant.name = "test";
tenant.password = "test";
var id

tenantModel.remove({name : "test"}, function (err) {

})
/*
 * Test the /GET route
 */
describe('/GET Tenants', function () {
    it('get all tenants', function (done) {
        chai.request(server)
            .get('/tenants')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
});


tenant.save(function (err, data) {
    if (err) {
        return next(err)
    }
    id = data._id
    console.log("id", id)
    var token = jwt.sign(data, jwt_secret, {
        expiresIn: "1d" // expires after 1 year
    });

    console.log(token)

    describe('/GET Configuration', function () {
        it('should succeed', function (done) {
            chai.request(server)
                .get('/tenants/'+id+'/configuration?token='+token)
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/GET Configuration', function () {
        it('should fail', function (done) {
            chai.request(server)
                .get('/tenants/'+id+'/configuration?token=123124124124')
                .end(function (err, res) {
                    tenantModel.remove({_id : id}, function (err) {

                    })
                    res.should.have.status(401);
                    done();
                });
        });
    });
});

