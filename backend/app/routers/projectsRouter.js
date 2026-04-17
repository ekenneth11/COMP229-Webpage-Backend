var express = require('express');
var router = express.Router();

let projectsController = require('../controllers/projectsController');
let authController = require('../controllers/auth');

router.get('/', 
    authController.requireSignin,
    authController.logToken,
    projectsController.projectsGetAll);
router.get("/:id", 
    authController.requireSignin, 
    authController.logToken, 
    projectsController.projectsGetID);
router.post('/', 
    authController.requireSignin, 
    authController.logToken, 
    projectsController.projectsNewItem);
router.put('/:id', 
    authController.requireSignin, 
    authController.logToken, 
    projectsController.projectsUpdateByID);
router.delete("/:id", 
    authController.requireSignin, 
    authController.logToken, 
    projectsController.projectsDeleteByID);



module.exports = router;