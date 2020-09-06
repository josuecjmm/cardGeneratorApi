const db = require('../utils/database');
const query = require('../data/queries/card/card.queries');

module.exports = class Card {
    constructor(
        cardType, cardNumber, expirationMonth,
        expirationYear, cvv, cardFunds, name
    ) {
        this.cardType = cardType;
        this.cardNumber = cardNumber;
        this.expirationMonth = expirationMonth;
        this.expirationYear = expirationYear;
        this.cvv = cvv;
        this.cardFunds = cardFunds;
        this.name = name;
    }

    save() {
        return db.insertUpdate(query.insert(),
            [
                this.cardType, this.cardNumber, this.expirationMonth,
                this.expirationYear, this.cvv, this.cardFunds, this.name
            ])
    }

    static fetchAll() {
        return db.select(query.selectAll())
    }

}
