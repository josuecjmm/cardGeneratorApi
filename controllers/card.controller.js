const Card = require('../models/card.model');

const creditCard = require('../utils/creditCard');
const db = require('../utils/database');
const RESPONSES = require('../constants/responses');
const validation = require('../utils/validations');

exports.postTransaction = async (req, res, next) => {
    try {
        const errors = validation.errors(req);
        if (errors.length > 0) {
            return res.status(400).json(errors.map(error => JSON.parse(error)))
        } else {
            return res.status(200).json(RESPONSES.CODE1)
        }
    } catch (e) {
        res.status(500).json(RESPONSES.CODE7);
    }
};

exports.postCreditCard = async (req, res, next) => {
    try {
        const {type} = req.query;

        const card = await creditCard.generateCreditCard(type);

        if (card) {

            const {
                cardType, number, expirationMonth,
                expirationYear, cvv, cardFunds, name
            } = card;

            let newCard = new Card(
                cardType, number, expirationMonth.toString(),
                expirationYear.toString(), cvv.toString(),
                cardFunds.toString(), name
            )

            await newCard.save();

            newCard.id = await db.getLastInsertId();

            return res.status(200).json(
                newCard
            )
        } else {
            return res.status(400).json(
                RESPONSES.CODE2
            )
        }

    } catch (e) {
        res.status(500).json(RESPONSES.CODE7);
    }

};
