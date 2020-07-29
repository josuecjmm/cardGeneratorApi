const crypto = require("crypto-js");
const config = require('../config/crypto.config');

exports.encrypt = (text) => {
    return crypto.AES.encrypt(text, config.secret).toString();
};

exports.decrypt = (text) => {
    const bytes  = crypto.AES.decrypt(text, config.secret);
    return bytes.toString(crypto.enc.Utf8);
};

