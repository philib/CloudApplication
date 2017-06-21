var express = require('express');
var path = require('path');
var request = require('request');
var config = require('./www/assets/config/default.json');

app = express();
app.use(express.static('www'));

app.get('/assets*', function (req, res) {
            return res.redirect('/')
})

app.get('/:tenantId', function (req, res) {
    var test = req.params.tenantId;
    console.log("Express endpoint: ",config.TenantService_Endpoint)
    //TODO gibts diese tenantID? Falls ja sendfile, falls nein redirect zu google.com
    request(config.TenantService_Endpoint+'tenants?name='+test, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            return res.sendFile(path.join(__dirname + '/www/assets/foo.html'));
        }else {
            return res.redirect('/')
        }
    })
})
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});