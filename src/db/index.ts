import { createPool } from "slonik";
import { dbconfig } from "@/configs/dbconfig";

const { user, password, host, port, database } = dbconfig;
const connectionStr = `postgres://${user}:${password}@${host}:${port}/${database}`;

export const pool = createPool(connectionStr);
