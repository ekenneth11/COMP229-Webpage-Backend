var express = require('express');
var router = express.Router();

let referenceController = require('../controllers/referenceController');

router.get('/', referenceController.referenceGetAll);
router.get("/:id", referenceController.getReferenceByID);
router.post('/', referenceController.addNewReference);
router.put('/:id', referenceController.editReferenceByID);
router.delete("/:id", referenceController.deleteReferenceByID);

module.exports = router;