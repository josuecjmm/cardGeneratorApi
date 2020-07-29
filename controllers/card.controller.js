const creditCard = require('../utils/creditCard');
const RESPONSES = require('../constants/creditCardResponses');

exports.postTransaction = async (req, res, next) => {

    const {
        cardType, number, expirationMonth,
        expirationYear, cvv, cardFunds,
        name, total
    } = req.body;

    const card = creditCard.validateCard(
        cardType, number, expirationMonth,
        expirationYear, cvv
    );

    let responseCodes = [];
    let valid = false;

    const leftFunds = cardFunds - total;

    if(leftFunds < 0) {
        responseCodes.push(RESPONSES.CODE5)
    }

    if(card.isExpired) {
        responseCodes.push(RESPONSES.CODE3)
    }

    if(!card.validCardNumber||!card.validCvv) {
        responseCodes.push(RESPONSES.CODE2)
    }

    if(
        card.validCardNumber && card.validCvv
        && leftFunds >=0
    ) {
        valid = true;
    }

    if(valid) {
        res.status(200).send(
            RESPONSES.CODE1
        );
    } else {
        res.status(400).send({
            Errors: responseCodes
        });
    }
};

exports.postCreditCard = async (req, res, next) => {
    const {type} = req.query;

    const card = await creditCard.generateCreditCard(type);

    res.status(200).json(
       card
    )
};
