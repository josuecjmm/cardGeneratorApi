const Card = require('../models/card.model');
const RESPONSES = require('../constants/responses');

exports.checkCardExists = async (req, res, next) => {
    const {cardId} = req.params;
    let card = await Card.fetchSingle(cardId);
    card = JSON.parse(card);
    if (card.length === 0) {
       return res.status(404).json(RESPONSES.CODE8('Card'));
    }
    next()
}
