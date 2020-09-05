exports.insert = () => {
return `INSERT INTO Card 
(card_type, card_number , expiration_month,
expiration_year, cvv, card_funds, name )
VALUES 
(?, ?, ?, ?, ?, ?, ?); 
`
}
