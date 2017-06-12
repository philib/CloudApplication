var express = require('express');
var router = express.Router();
var TenantController = require('../controllers/tenant');
var mid = require('../middleware/authentication')


router.route('/tenants')
    .get(TenantController.getAllTenants);
router.get('/tenants/:tenantId/configuration', mid.isAuthenticated, TenantController.getConfiguration);
router.put('/tenants/:tenantId/configuration', mid.isAuthenticated, TenantController.updateConfiguration);

module.exports = router;
