import { sqlx, SqlxQuery } from "slonix";
import { storedFunction } from "../helpers/storedFunction";
import { sql } from "slonik";
import { UserDb } from "../models/UserDb";

const UserT = UserDb.table;
const UserP = UserDb.props;

const name = sql.identifier(["createUser"]);

export const createSql = storedFunction({
    name: name,
    language: "plpgsql",
    params: ["email varchar", "passwordHash varchar", "OUT userId integer"],
})`
    BEGIN
        INSERT INTO ${UserT} (${UserP.email}, ${UserP.passwordHash})
        VALUES (email, passwordHash)
        RETURNING ${UserP.id} INTO userId;
    END;
`;

export const createUser = (email: string, passwordHash: string): SqlxQuery => {
    return sqlx`SELECT * FROM ${name}(email => ${email}, passwordHash => ${passwordHash});`;
};
