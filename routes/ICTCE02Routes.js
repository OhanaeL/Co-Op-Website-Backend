const express = require('express');
const router = express.Router();
const ictce02Controller = require('../controllers/ICTCE02Controller');

router.post('/', ictce02Controller.createIctce02);
router.get('/', ictce02Controller.getAllIctce02);
router.get('/:id', ictce02Controller.getIctce02ById);
router.put('/:id', ictce02Controller.updateIctce02);
router.delete('/:id', ictce02Controller.deleteIctce02);

module.exports = router;
