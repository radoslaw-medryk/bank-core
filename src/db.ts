import knex from "knex";
const dbconfig = require("secrets/dbconfig");

export const db = knex(dbconfig);
