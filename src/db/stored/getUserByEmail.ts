import { sqlx } from "slonix";
import { storedFunction } from "@/db/helpers/storedFunction";
import { sql } from "slonik";
import { UserDb } from "../models/UserDb";

const UserT = UserDb.table;
const UserP = UserDb.props;

const name = sql.identifier(["getUserByEmail"]);

export const createSql = storedFunction({
    name: name,
    language: "sql",
    params: ["_email varchar"],
    returns: sqlx`SETOF ${UserT}`,
})`
    SELECT * FROM ${UserT} WHERE ${UserP.email} = _email;
`;

export const getUserByEmail = (email: string) => {
    return sqlx`SELECT * FROM ${name}(_email => ${email})`;
};
