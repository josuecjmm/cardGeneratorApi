const mysql = require('mysql2');
const database = require('../config/database.config');
const pool = mysql.createPool(database.config);
const poolPromise = pool.promise();

const crypto = require('./crypto');

exports.select = async (query, values) => {
    let result;
    try {
        const [rows] = await poolPromise.execute(query, values);
        result = rows;
        result = result.map(value => {
            const keys = Object.keys(value);
            const vals = Object.values(value).map(v => {
                return crypto.decrypt(v).length > 0
                    ? crypto.decrypt(v)
                    : v;
            });
            return Object.assign(...keys.map(
                (k, i) =>
                    ({[k]: vals[i]})))
        });
    } catch (e) {
        throw new Error(e);
    }
    return JSON.stringify(result);
};

exports.insertUpdate = async (query, values) => {
    try {
        values = values.map(value => {
            return typeof value === "string" ? crypto.encrypt(value) : value;
        });
        await poolPromise.execute(query, values)
    } catch (e) {
        throw new Error(e);
    }
};

exports.getLastInsertId = async () => {
    try {
        const [rows] = await poolPromise.execute('SELECT LAST_INSERT_ID() "id";')
        return rows[0].id
    } catch (e) {
        throw new Error(e);
    }
}
