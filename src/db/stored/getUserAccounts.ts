import { sqlx } from "slonix";
import { storedFunction } from "@/db/helpers/storedFunction";
import { sql } from "slonik";
import { UserDbId } from "../models/UserDb";
import { UserAccountDb } from "../models/UserAccountDb";
import { AccountDb } from "../models/AccountDb";

const UserAccountT = UserAccountDb.table;
const UserAccountP = UserAccountDb.props;

const AccountT = AccountDb.table;
const AccountP = AccountDb.props;

const name = sql.identifier(["getUserAccounts"]);

export const createSql = storedFunction({
    name: name,
    language: "sql",
    params: ["_userId integer"],
    returns: sqlx`SETOF ${AccountT}`,
})`
    SELECT a.* FROM ${UserAccountT} ua
    JOIN ${AccountT} a ON ua.${UserAccountP.accountId} = a.${AccountP.id}
    WHERE ua.${UserAccountP.userId} = _userId
    ORDER BY a.${AccountP.id}
`;

export const getUserAccounts = (userId: UserDbId) => {
    return sqlx`SELECT * FROM ${name}(_userId => ${userId})`;
};
