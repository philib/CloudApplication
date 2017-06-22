var jwt = require('jsonwebtoken')
var config = require('config');

var jwt_secret = process.env.JWT_SECRET || config.JWTSecret
exports.isAuthenticated = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var tenantId = req.params.tenantId;
console.log("test")
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, jwt_secret, function (err, decoded) {
            if (err) {
                return res.status(401).json({success: false, message: 'Failed to authenticate tokens.'});
            } else {
                console.log(decoded)
                // if everything is good, save to request for use in other routes
                if(decoded._id === tenantId){
                    req.decoded = decoded;
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