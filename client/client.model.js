require('dotenv').config();
const { Database } = require('../shared/sqlClasses.js');

const connectionProperties = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    passwort: process.env.DB_PASSWORT,
    database: process.env.DB_NAME,
};

async function getAll(sort = null) {
    const sql = `
    SELECT bid, bname, bdescription, bheight, bdiameter, bvolume, bprice
    FROM bottoms
    ORDER BY bdiameter ${!sort || sort === "asc" ? "ASC" : "DESC"};
    `;

    const database = new Database(connectionProperties);

    try {
        const result = await database.queryClose(sql);
        return result.length === 0 ?
            Promise.reject("No bottoms found") :
            Promise.resolve(result);
    } catch (error) {
        return Promise.reject("Database error");
    }
}