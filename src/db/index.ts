import knex from "knex";
const dbconfig = require("@/secrets/dbconfig");

export const db = knex(dbconfig);

// TODO [RM]: debug only
db.on("query", (query: any) => {
    console.log("SQL:", query.sql);
});
