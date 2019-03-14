import { createPool } from "slonik";
const dbconfig = require("@/secrets/dbconfig");

const { user, password, host, port, database } = dbconfig;
const connectionStr = `postgres://${user}:${password}@${host}:${port}/${database}`;

export const pool = createPool(connectionStr);
