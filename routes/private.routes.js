const express = require('express');
const router = express.Router();

const cardController = require('../controllers/card.controller');
const validation = require('../middleware/cardValidations')
const errors = require('../middleware/validationErrors')

router.post('/pay', validation.pay, errors.validateErrors, cardController.postTransaction);
router.post('/card', cardController.postCreditCard);
router.get('/cards', cardController.getAllCards);
router.get('/card/:cardId', validation.checkCardExists, cardController.getSingleCreditCard);
router.put('/card/:cardId', validation.checkCardExists, validation.updateFunds,
    errors.validateErrors, cardController.updateCard
);
router.delete('/card/:cardId', validation.checkCardExists, cardController.deleteCard);

module.exports = {routes: router};
