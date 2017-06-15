var express = require('express'),
    app = express();
app.use(express.static('www'));
var path = require('path');

var request = require('request');
app.set('tenant', process.env.BOT_TENANT || 'http://localhost:8082');
app.get('/:tenantId', function (req, res) {
    var test = req.params.tenantId;
    var url = app.get('tenant')
    console.log("Express endpoint: ",url)
    //TODO gibts diese tenantID? Falls ja sendfile, falls nein redirect zu google.com
    request(url+'/tenants?name='+test, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.sendFile(path.join(__dirname + '/www/assets/foo.html'));
        }else {
            return res.redirect('/')
        }
    })
})
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});