var express = require('express');
var router = express.Router();

let servicesController = require('../controllers/servicesController');

router.get('/', servicesController.serviceGetAll);
router.get("/:id", servicesController.getServiceByID);
router.post('/', servicesController.addNewService);
router.put('/:id', servicesController.editServiceByID);
router.delete("/:id", servicesController.deleteServiceByID);

module.exports = router;