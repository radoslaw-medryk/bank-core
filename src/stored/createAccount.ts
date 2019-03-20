import { sqlx, SqlxQuery } from "slonix";
import { storedFunction } from "../helpers/storedFunction";
import { Account } from "@/models/Account";
import { sql } from "slonik";

const AccountT = Account.table;
const AccountP = Account.props;

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
