require('dotenv').config();
const { Database } = require('../shared/sqlClasses');

const connectionProperties = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    passwort: process.env.DB_PASSWORT,
    database: process.env.DB_NAME,
};

async function getAllTanks(sort = null) {
    const sql = `
    SELECT *
    FROM tanks
    ORDER BY tname ${!sort || sort === "asc" ? "ASC" : "DESC"};
    `;
    try {
        const database = new Database(connectionProperties);

        const result = await database.queryClose(sql);
        console.log("getAllTanks");
        return result.length === 0 ?
            Promise.reject("No tanks found") :
            Promise.resolve(result);
    } catch (error) {
        return Promise.reject("Database error");
    };
}

async function searchTanksByName(name, sort = null) {
    const sql = `
    SELECT *
    FROM tanks
    WHERE tname LIKE ?
    ORDER BY tname ${!sort || sort === "asc" ? "ASC" : "DESC"};
    `;
    try {
        const database = new Database(connectionProperties);
        const result = await database.queryClose(sql, [name]);
        console.log("searchTanksByName");
        return result.length === 0 ?
            Promise.reject("No tanks found") :
            Promise.resolve(result);
    } catch (error) {
        return Promise.reject("Database error");
    };
}

async function getTankById(tid) {
    const sql = `
    SELECT *
    FROM tanks
    WHERE tname = ?;
    `;
    try {
        const database = new Database(connectionProperties);
        const result = await database.queryClose(sql, [tid]);
        console.log("getTanksByName");
        return result.length === 0 ?
            Promise.reject("Tank not found") :
            Promise.resolve(result);
    } catch (error) {
        return Promise.reject("Database error");
    };
}