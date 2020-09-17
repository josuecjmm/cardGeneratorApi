const {body} = require('express-validator');
const RESPONSES = require('../constants/responses');
const creditCard = require('../utils/creditCard');

const Card = require('../models/card.model')

exports.checkCardExists = async (req, res, next) => {
    const {cardId} = req.params;
    let card = await Card.fetchSingle(cardId);
    card = JSON.parse(card);
    if (card.length === 0) {
        return res.status(404).json(RESPONSES.CODE8('Card'));
    }
    next()
}

exports.pay = [
    body('cardType').notEmpty()
        .withMessage(JSON.stringify(RESPONSES.CODE6('cardType'))),
    body('number').notEmpty()
        .withMessage(JSON.stringify(RESPONSES.CODE6('expirationMonth'))),
    body('expirationMonth').notEmpty()
        .withMessage(JSON.stringify(RESPONSES.CODE6('expirationMonth'))),
    body('expirationYear').notEmpty()
        .withMessage(JSON.stringify(RESPONSES.CODE6('expirationYear'))),
    body('cvv').notEmpty()
        .withMessage(JSON.stringify(RESPONSES.CODE6('cvv'))),
    body('name').notEmpty()
        .withMessage(JSON.stringify(RESPONSES.CODE6('name'))),
    body('total').notEmpty()
        .withMessage(JSON.stringify(RESPONSES.CODE6('total'))),

    body('number').custom((value, {req}) => {
        const {
            cardType, number, expirationMonth,
            expirationYear, cvv
        } = req.body;

        const card = creditCard.validateCard(
            cardType, number, expirationMonth,
            expirationYear, cvv
        );

        if(card.isExpired) {
                throw new Error(JSON.stringify(RESPONSES.CODE3))
        }

        if(!card.validCardNumber||!card.validCvv) {
            throw new Error(JSON.stringify(RESPONSES.CODE2))
        }

        return true;
    })
];

exports.updateFunds = [
    body('cardFunds').notEmpty().isNumeric()
        .withMessage(JSON.stringify(RESPONSES.CODE6('cardFunds'))),

    body('cardFunds').custom((value) => {
        if (value < 0) {
            throw new Error(JSON.stringify(RESPONSES.CODE5))
        }
        return true;
    }),
];
