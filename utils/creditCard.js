const axios = require('./axios');

const cheerio = require('cheerio');
const faker = require('faker');

const creditCard = require('credit-card');

const generators = {
    MASTERCARD: 'https://generator.creditcard/mastercard.php',
    VISA: 'https://generator.creditcard/visa.php',
    AMERICANEXPRESS: 'https://generator.creditcard/amex.php'
};

const selectors = {
    cc: '#ccnumberr',
    valid: '#xvalidate',
    cvv: '#cccv'
};

/*Usage:
*
* const visaCard = async () => {
    const visa = await generateCreditCard('VISA');
};
* */

exports.generateCreditCard = async (type) => {
    const api = generators[type];

    const responseBody = await axios.response(api);
    const $ = cheerio.load(responseBody);


    const cc = $(selectors.cc).val();
    let valid = $(selectors.valid).val();
    valid = `${valid.split('/')[0]}/20${valid.split('/')[1]}`;
    const cvv = $(selectors.cvv).val();

    const name = (`${faker.name.firstName()} ${faker.name.firstName()}`).toUpperCase();
    const funds =   faker.random.number();

    return {
        cardType: type,
        number: cc,
        expirationMonth: valid.split('/')[0],
        expirationYear: valid.split('/')[1],
        cvv: cvv,
        cardFunds: funds,
        name: name
    }
};

/*Usage :

*   creditCard.validate(card(
    'VISA', '4929749301981850', '09',
    '2022', 401
));
*
* */
exports.validateCard = (
    cardType, number, expirationMonth,
    expirationYear, cvv
) => {
    return creditCard.validate({
        cardType: cardType,
        number: number,
        expiryMonth: expirationMonth,
        expiryYear: expirationYear,
        cvv: cvv
    });
};



