import { sqlx } from "slonix";
import { storedFunction } from "@/db/helpers/storedFunction";
import { sql } from "slonik";
import { AccountDb, AccountDbId } from "@/db/models/AccountDb";
import { UserDbId } from "../models/UserDb";
import { UserAccountDb } from "../models/UserAccountDb";

const UserAccountT = UserAccountDb.table;
const UserAccountP = UserAccountDb.props;

const AccountT = AccountDb.table;
const AccountP = AccountDb.props;

const name = sql.identifier(["getUserAccount"]);

export const createSql = storedFunction({
    name: name,
    language: "sql",
    params: ["_userId integer", "_accountId integer"],
    returns: sqlx`SETOF ${AccountT}`,
})`
    SELECT a.* FROM ${UserAccountT} ua
    JOIN ${AccountT} a ON ua.${UserAccountP.accountId} = a.${AccountP.id}
    WHERE ua.${UserAccountP.userId} = _userId
    AND ua.${UserAccountP.accountId} = _accountId
`;

export const getUserAccount = (userId: UserDbId, accountId: AccountDbId) => {
    return sqlx`SELECT * FROM ${name}(_userId => ${userId}, _accountId => ${accountId})`;
};
