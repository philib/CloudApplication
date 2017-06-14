var jwt = require('jsonwebtoken')
var config = require('config');

exports.isAuthenticated = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var tenantId = req.params.tenantId;

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.JWTSecret, function (err, decoded) {
            if (err) {
                return res.status(401).json({success: false, message: 'Failed to authenticate tokens.'});
            } else {
                // if everything is good, save to request for use in other routes
                if(decoded._doc._id === tenantId){
                    req.decoded = decoded;
                    console.log(decoded._doc.name);
                    next();
                }else {
                    return res.status(401).json({success: false, message: 'Failed to authenticate tokens.'});
                }
            }
        });

    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
}