import { sqlx } from "slonix";
import { storedFunction } from "@/db/helpers/storedFunction";
import { sql } from "slonik";
import { UserDbId } from "../models/UserDb";
import { UserAccountDb } from "../models/UserAccountDb";
import { AccountDbId } from "../models/AccountDb";

const UserAccountT = UserAccountDb.table;
const UserAccountP = UserAccountDb.props;

const name = sql.identifier(["isUserAccount"]);

export const createSql = storedFunction({
    name: name,
    language: "sql",
    params: ["_userId integer", "_accountId integer"],
    returns: "boolean",
})`
    SELECT EXISTS (
        SELECT 1 FROM ${UserAccountT}
        WHERE ${UserAccountP.userId} = _userId
        AND ${UserAccountP.accountId} = _accountId
    )
`;

export const isUserAccount = (userId: UserDbId, accountId: AccountDbId) => {
    return sqlx`SELECT * FROM ${name}(_userId => ${userId}, _accountId => ${accountId})`;
};
