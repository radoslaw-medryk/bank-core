import { sqlx, SqlxQuery } from "slonix";
import { storedFunction } from "../helpers/storedFunction";
import { AccountDb } from "@/db/models/AccountDb";
import { sql } from "slonik";

const AccountT = AccountDb.table;
const AccountP = AccountDb.props;

const name = sql.identifier(["createAccount"]);

export const createSql = storedFunction({
    name: name,
    language: "plpgsql",
    params: ["OUT accountId integer"],
})`
    BEGIN
        INSERT INTO ${AccountT} (${AccountP.balance}) VALUES (0)
        RETURNING ${AccountP.id} INTO accountId;
    END;
`;

export const createAccount = (): SqlxQuery => {
    return sqlx`SELECT * FROM ${name}();`;
};
