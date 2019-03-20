import { sqlx } from "slonix";
import { storedFunction } from "@/db/helpers/storedFunction";
import { sql } from "slonik";
import { AccountDb, AccountDbId } from "@/db/models/AccountDb";

const AccountT = AccountDb.table;
const AccountP = AccountDb.props;

const name = sql.identifier(["getAccount"]);

export const createSql = storedFunction({
    name: name,
    language: "sql",
    params: ["accountId integer"],
    returns: sqlx`SETOF ${AccountT}`,
})`
    SELECT * FROM ${AccountT} WHERE ${AccountP.id} = accountId;
`;

export const getAccount = (accountId: AccountDbId) => {
    return sqlx`SELECT * FROM ${name}(accountId => ${accountId})`;
};
