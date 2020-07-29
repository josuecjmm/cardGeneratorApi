const mysql = require('mysql2');
const database = require('../config/database.config');
const pool = mysql.createPool(database.config);
const poolPromise = pool.promise();

const auditQueries = require('../data/queries/queries/audit.queries');
const errorQueries = require('../data/queries/queries/error.queries');

const crypto = require('./crypto');

const argv = require('yargs').argv;

const date = new Date();

exports.select = async (query, values) => {
    let result;
    try {
        const [rows,fields] = await poolPromise.execute(query, values);
        result = rows;
        if(argv.encrypted === "true") {
            const values = result.map(value => {
                const keys = Object.keys(value);
                const vals =  Object.values(value).map(v =>{
                    if(isNaN(v)) {
                        return crypto.decrypt(v).length > 0
                            ? crypto.decrypt(v)
                            : v;
                    } else {
                        return v
                    }
                });
                return Object.assign(...keys.map(
                    (k, i) =>
                        ({[k]: vals[i]})))
            });
            result = values;
        }
    } catch (e) {
        console.log('Error in select query =>', query, e)
    }
    return JSON.stringify(result);
};

exports.insertUpdate = async(query, values) => {
    let error;
    try {
        // Encryption
        if(argv.encrypted === "true") {
            const encryptedValues = values.map(value => {
                const v = isNaN(value) ? crypto.encrypt(value) : value;
                return v
            });
            values = encryptedValues;
        }
        await poolPromise.execute(query, values)
    } catch (e) {
        error = e;
        console.log('Error in query =>',query, e)
    }
    finally {
        if(!error) {
            // Set Query Type
            let queryType;
            if(query.includes('INTO') ) {
                queryType = 'INTO'
            } else if(query.includes('UPDATE')) {
                queryType = 'UPDATE'
            } else {
                queryType = 'DELETE'
            }
            // Set entityType
            const entityType = query.split(queryType)[1].split('\n')[0].trim();

            // Insert Audit
            await poolPromise.execute(auditQueries.insertAudit(), [date, query, entityType]);
        } else {
            // Insert Error
            await poolPromise.execute(errorQueries.insertError(), [date, JSON.stringify(error)]);

        }
    }

};
