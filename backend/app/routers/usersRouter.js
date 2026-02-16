var express = require('express');
var router = express.Router();

let usersController = require('../controllers/usersController');

//getAll
//getUserByID
//addNewUser
//editUserByID
//deleteUserByID
router.get('/', usersController.usersGetAll);
router.get("/:id", usersController.getUserByID);
router.post('/', usersController.addNewUser);
router.put('/:id', usersController.editUserByID);
router.delete("/:id", usersController.deleteUserByID);

module.exports = router;