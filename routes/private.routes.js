const express = require('express');
const router = express.Router();

const cardController = require('../controllers/card.controller');
const cardMiddleware = require('../middleware/card.middleware');
const validation = require('../utils/validations')

router.post('/pay', validation.pay, cardController.postTransaction);
router.post('/card', cardController.postCreditCard);
router.get('/cards', cardController.getAllCards);
router.get('/card/:cardId', cardMiddleware.checkCardExists, cardController.getSingleCreditCard);
router.delete('/card/:cardId', cardMiddleware.checkCardExists, cardController.deleteCard);

module.exports = {routes: router};
