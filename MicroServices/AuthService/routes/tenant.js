var TenantController = require('../controllers/tenant');
var BotController = require('../controllers/bot');
var CarController = require('../controllers/car');
var ResellerController = require('../controllers/reseller')
var express = require('express');
var router = express.Router();
var mid = require('../middleware/authentication')

router.route('/')
    .get(TenantController.getAllTenants);

router.route('/login')
    .post(TenantController.login);

router.route('/register')
    .post(TenantController.register);

router.get('/:tenantId/configure', mid.isAuthenticated, TenantController.getConfiguration);
router.put('/:tenantId/configure', mid.isAuthenticated, TenantController.updateConfiguration);

router.route('/:tenantId/bot')
    .get(BotController.foo);

// Car Routes
router.route('/:tenantId/cars')
    .get(CarController.getAllCars)

router.post('/:tenantId/cars', mid.isAuthenticated, CarController.addCar)

router.delete('/:tenantId/cars/:carId', mid.isAuthenticated, CarController.deleteCar)
router.put('/:tenantId/cars/:carId', mid.isAuthenticated, CarController.updateCar)

//Reseller Routes
router.route('/:tenantId/reseller')
    .get(ResellerController.getAllReseller)

router.post('/:tenantId/reseller', mid.isAuthenticated, ResellerController.addReseller)

router.delete('/:tenantId/reseller/:resellerId', mid.isAuthenticated, ResellerController.deleteReseller)
router.put('/:tenantId/reseller/:resellerId', mid.isAuthenticated, ResellerController.updateReseller)

module.exports = router;