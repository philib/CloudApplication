var express = require('express');
var app = express();
var routes = require('./routes/index');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('config');

var port = process.env.PORT || 8082;
var db_endpoint = process.env.DB_ENDPOINT || config.DB_ENDPOINT
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
});

var subpath = express();
app.use("/v1", subpath);
var swagger = require('swagger-node-express').createNew(subpath);
app.use(express.static('public'));
swagger.setApiInfo({
    title: "example API",
    description: "API to do something, manage something...",
    termsOfServiceUrl: "",
    contact: "yourname@something.com",
    license: "",
    licenseUrl: ""
});
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
swagger.configureSwaggerPaths('', 'api-docs', '');
var domain = 'localhost';
var applicationUrl = 'http://' + domain + ':' + port;
swagger.configure(applicationUrl, '1.0.0');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(routes);

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send({"Error": err.message});
});

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

mongoose.connect(db_endpoint, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {
    // Wait for the database connection to establish, then start the app.
    var server = app.listen(port, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log("Tenant Service listening at http://%s:%s", host, port)
    });
});
module.exports = app;
