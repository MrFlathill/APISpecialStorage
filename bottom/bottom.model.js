require('dotenv').config();
const { Database } = require('../shared/sqlClasses.js');

const connectionProperties = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

async function getAllBottoms(sort = null) {
    const sql = `
    SELECT *
    FROM bottoms
    ORDER BY bdiameter ${!sort || sort === "asc" ? "ASC" : "DESC"};
    `;
    try {
        const database = new Database(connectionProperties);
        const result = await database.queryClose(sql);
        console.log("getAllBottoms");
        return result.length === 0 ?
            Promise.reject("No bottoms found") :
            Promise.resolve(result);
    } catch (error) {
        return Promise.reject("Database error");
    }
}

async function getBottomById(bid) {
    const sql = `
    SELECT *
    FROM bottoms
    WHERE bid = ?;
    `;
    try {
        const database = new Database(connectionProperties);
        const result = await database.queryClose(sql, [bid]);
        console.log("getBottomById");
        if (result.length === 0) {
            return Promise.reject("Bottom not found");
        } else {
            return Promise.resolve(result[0]);
        }
    } catch (error) {
        return Promise.reject("Database error");
    }
}

async function insertBottom(bottom) {
    try {
        const database = new Database(connectionProperties);

        const sql2 = `SELECT bname FROM bottoms`;
        const result2 = await database.query(sql2);
        if (result2.find(i => i.bname === bottom.bname)) {
            console.log("duplicate Name detected");
            return Promise.reject("Name already used, try something else ;)");
        }
        const sql = `INSERT INTO bottoms(bname, bdescription, bheight, bdiameter, bvolume, bprice) VALUES(?,?,?,?,?,?) `;
        const result = await database.queryClose(sql, [
            bottom.bname,
            bottom.bdescription,
            bottom.bheight,
            bottom.bdiameter,
            bottom.bvolume,
            bottom.bprice,
        ]);
        console.log("insertBottom");
        if (result.affectedRows === 0) {
            return Promise.reject("Bottom not added");
        } else {
            return Promise.resolve(
                "Bottom " + bottom.bname + " has been added successfully!"
            );
        }
    } catch (error) {
        return Promise.reject("Database error");
    }
}

async function updateBottom(bottom) {
    try {
        const database = new Database(connectionProperties);

        const sql = `SELECT bid FROM bottoms`;
        const result2 = await database.query(sql);
        if (result2.find(i => i.bid === bottom.bid)) {
            const sqlupdate = `
            UPDATE bottoms SET bname=?,bdescription=?,bheight=?,bdiameter=?,bvolume=?,bprice=?
            WHERE bid = ?
            `;
            console.log("1");
            const result = await database.queryClose(sqlupdate, [
                bottom.bname,
                bottom.bdescription,
                bottom.bheight,
                bottom.bdiameter,
                bottom.bvolume,
                bottom.bprice,
                bottom.bid,
            ]);
            console.log("2");
            console.log("updateBottom");
            if (result.affectedRows === 0) {
                return Promise.reject("Bottom not changed");
            } else {
                return Promise.resolve(
                    "Bottom " + bottom.bid + " has been changed successfully!"
                );
            }

        }
        console.log("no Item with this BID detected");
        return Promise.reject("no Item with this BID detected");
    } catch (error) {
        return Promise.reject("Database error");
    }
}

async function deleteBottom(bid) {
    try {
        const database = new Database(connectionProperties);
        const sql = `DELETE FROM bottoms WHERE bid = ?`;
        console.log("???");
        const result = await database.queryClose(sql, [bid]);
        console.log("deleteMovie");
        if (result.affectedRows === 0) {
            return Promise.reject("Bottom not found");
        } else {
            return Promise.resolve(
                "Bottom with bid: " + bid + " has been deleted sucessfully!"
            );
        }
    } catch (error) {
        return Promise.reject("Database error");
    }
}


module.exports = {
    getAllBottoms,
    getBottomById,
    insertBottom,
    updateBottom,
    deleteBottom,
};