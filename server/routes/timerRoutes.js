const express = require('express');
const router = express.Router();
const timerController = require('../controllers/timerController');

router.post('/timer/start', timerController.startTimer);
router.post('/timer/reset', timerController.resetTimer);

module.exports = router;