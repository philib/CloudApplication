var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/authentication');

router.route('/login')
    .post(AuthController.login);

router.route('/register')
    .post(AuthController.register);

module.exports = router;
