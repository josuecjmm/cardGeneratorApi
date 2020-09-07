const express = require('express');
const router = express.Router();

const cardController = require('../controllers/card.controller');
const validation = require('../utils/validations')

router.post('/pay', validation.pay, cardController.postTransaction);
router.post('/card', cardController.postCreditCard);
router.get('/cards', cardController.getAllCreditCard);
router.get('/card/:cardId', cardController.getSingleCreditCard);

module.exports = {routes: router};
