import { sqlx } from "slonix";
import { storedFunction } from "@/helpers/storedFunction";
import { sql } from "slonik";
import { Account, AccountId } from "@/models/Account";

const AccountT = Account.table;
const AccountP = Account.props;

const name = sql.identifier(["getAccount"]);

export const createSql = storedFunction({
    name: name,
    language: "sql",
    params: ["accountId integer"],
    returns: sqlx`SETOF ${AccountT}`,
})`
    SELECT * FROM ${AccountT} WHERE ${AccountP.id} = accountId;
`;

export const getAccount = (accountId: AccountId) => {
    return sqlx`SELECT * FROM ${name}(accountId => ${accountId})`;
};
