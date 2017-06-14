var express = require('express'),
    app = express();
app.use(express.static('www'));
app.get('/:tenantId', function (req, res) {

    //TODO gibts diese tenantID? Falls ja sendfile, falls nein redirect zu google.com
    res.sendfile('www/index.html');
})
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});