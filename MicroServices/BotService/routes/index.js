var express = require('express');
var router = express.Router();
var BotController = require('../controllers/bot');


router.route('/:tenantId/conversation')
    .get(BotController.answer);

module.exports = router;
