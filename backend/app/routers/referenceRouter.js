var express = require('express');
var router = express.Router();

let referenceController = require('../controllers/referenceController');
let authController = require('../controllers/auth');
router.get('/', 
    authController.requireSignin,
        authController.logToken,
        referenceController.referenceGetAll);
router.get("/:id", 
    authController.requireSignin, 
    authController.logToken, 
    referenceController.getReferenceByID);
router.post('/', 
    authController.requireSignin, 
    authController.logToken, 
    referenceController.addNewReference);
router.put('/:id', 
    authController.requireSignin, 
    authController.logToken, 
    referenceController.editReferenceByID);
router.delete("/:id", 
    authController.requireSignin, 
    authController.logToken, 
    referenceController.deleteReferenceByID);

module.exports = router;