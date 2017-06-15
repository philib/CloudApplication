var express = require('express');
var path = require('path');
var request = require('request');
var config = require('config');

app = express();
app.use(express.static('www'));

app.set('tenant', config.get('BotService_Endpoint') || 'http://localhost:8082');
console.log("is config active?", config.get('BotService_Endpoint'))

app.get('/:tenantId', function (req, res) {
    var test = req.params.tenantId;
    var url = app.get('tenant')
    console.log("Express endpoint: ",url)
    return res.sendFile(path.join(__dirname + '/www/assets/foo.html'));
    //TODO gibts diese tenantID? Falls ja sendfile, falls nein redirect zu google.com
    request(url+'/tenants?name='+test, function (error, response, body) {
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