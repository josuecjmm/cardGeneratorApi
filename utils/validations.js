const {body, validationResult} = require('express-validator');
const responses = require('../constants/responses');
const creditCard = require('../utils/creditCard');

exports.pay = [
    body('cardType').notEmpty()
        .withMessage(JSON.stringify(responses.CODE6('cardType'))),
    body('number').notEmpty()
        .withMessage(JSON.stringify(responses.CODE6('expirationMonth'))),
    body('expirationMonth').notEmpty()
        .withMessage(JSON.stringify(responses.CODE6('expirationMonth'))),
    body('expirationYear').notEmpty()
        .withMessage(JSON.stringify(responses.CODE6('expirationYear'))),
    body('cvv').notEmpty()
        .withMessage(JSON.stringify(responses.CODE6('cvv'))),
    body('cardFunds').notEmpty()
        .withMessage(JSON.stringify(responses.CODE6('cardFunds'))),
    body('name').notEmpty()
        .withMessage(JSON.stringify(responses.CODE6('name'))),
    body('total').notEmpty()
        .withMessage(JSON.stringify(responses.CODE6('total'))),


    body('cardFunds').custom((value, {req}) => {
        const leftFunds = value - req.body.total;
        if (leftFunds < 0) {
            throw new Error(JSON.stringify(responses.CODE5))
        }
        return true;
    }),

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
                throw new Error(JSON.stringify(responses.CODE3))
        }

        if(!card.validCardNumber||!card.validCvv) {
            throw new Error(JSON.stringify(responses.CODE2))
        }

        return true;
    })
];

exports.errors = (req) => {
    const errors = validationResult(req);
    const parsedErrorMessage = errors.errors.map(error => {
        return `${error.msg}`
    });

    return [...new Set(parsedErrorMessage)];
};
