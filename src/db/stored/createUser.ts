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
    params: ["_email varchar", "_passwordHash varchar", "OUT _userId integer"],
})`
    BEGIN
        INSERT INTO ${UserT} (${UserP.email}, ${UserP.passwordHash})
        VALUES (_email, _passwordHash)
        RETURNING ${UserP.id} INTO _userId;
    END;
`;

export const createUser = (email: string, passwordHash: string): SqlxQuery => {
    return sqlx`SELECT * FROM ${name}(_email => ${email}, _passwordHash => ${passwordHash});`;
};
