const {validationResult} = require('express-validator');

const errors = (req) => {
    const errors = validationResult(req);
    const parsedErrorMessage = errors.errors.map(error => {
        return `${error.msg}`
    });

    return [...new Set(parsedErrorMessage)];
};

exports.validateErrors = (req, res, next) => {
    const errorResults = errors(req);

    if (errorResults.length > 0) {
        return res.status(400).json(errorResults.map(error => JSON.parse(error)))
    }
    next()
}
