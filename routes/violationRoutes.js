const express = require('express');
const router = express.Router();
const violationController = require('../controllers/violationController');

// Route to add a new violation
router.post('/addViolation', violationController.addViolation);

// Route to process the next violation (highest priority)
router.get('/processViolation', violationController.processViolation);

// Route to undo the last added violation
router.get('/undoViolation', violationController.undoViolation);

router.get('/getViolations', violationController.getViolations);


module.exports = router;
