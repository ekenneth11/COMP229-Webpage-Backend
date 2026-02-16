var express = require('express');
var router = express.Router();

let projectsController = require('../controllers/projectsController');


router.get('/', projectsController.projectsGetAll);
router.get("/:id", projectsController.projectsGetID);
router.post('/', projectsController.projectsNewItem);
router.put('/:id', projectsController.projectsUpdateByID);
router.delete("/:id", projectsController.projectsDeleteByID);



module.exports = router;