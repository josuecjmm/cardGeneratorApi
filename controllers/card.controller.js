const creditCard = require('../utils/creditCard');
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

        res.status(200).json(
            card
        )
    } catch (e) {
        res.status(400).json(RESPONSES.CODE2);
    }

};
