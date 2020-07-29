const express = require('express');
const router = express.Router();

const cardController = require('../controllers/card.controller');

// GET /error
router.post('/pay', cardController.postTransaction );
router.post('/card', cardController.postCreditCard );

module.exports = {routes: router};
