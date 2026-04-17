var express = require('express');
var router = express.Router();

let servicesController = require('../controllers/servicesController');
let authController = require('../controllers/auth');
router.get('/', 
    authController.requireSignin,
    authController.logToken,
    servicesController.serviceGetAll);
router.get("/:id", 
    authController.requireSignin, 
    authController.logToken, 
    servicesController.getServiceByID);
router.post('/', 
    authController.requireSignin, 
    authController.logToken, 
    servicesController.addNewService);
router.put('/:id', 
    authController.requireSignin, 
    authController.logToken, 
    servicesController.editServiceByID);
router.delete("/:id", 
    authController.requireSignin, 
    authController.logToken, 
    servicesController.deleteServiceByID);

module.exports = router;