exports.CODE1 = {
    code: 1,
    result: 'Successful Transaction'
};

exports.CODE2 = {
    code: 2,
    result: 'Invalid Card'
};

exports.CODE3 = {
    code: 3,
    result: 'Expired Card'
};

exports.CODE4 = {
    code: 4,
    result: 'Unsupported Card'
};

exports.CODE5 = {
    code: 5,
    result: 'Not enough funds'
};

exports.CODE6 = field => {
    return {
        code: 6,
        result: `${field} is required`
    }
}

exports.CODE7 = {
    code: 7,
    result: 'Internal Server Error'
};

exports.CODE8 = (item) => {
    return {
        code: 8,
        result: `${item} not found`
    }
}

exports.CODE9 = {
    code: 9,
    result: `Successfully deleted Card`
}


