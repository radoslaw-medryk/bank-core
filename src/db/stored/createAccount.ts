import { sqlx, SqlxQuery } from "slonix";
import { storedFunction } from "../helpers/storedFunction";
import { AccountDb } from "@/db/models/AccountDb";
import { sql } from "slonik";
import { UserDbId } from "../models/UserDb";
import { UserAccountDb } from "../models/UserAccountDb";

const AccountT = AccountDb.table;
const AccountP = AccountDb.props;

const UserAccountT = UserAccountDb.table;
const UserAccountP = UserAccountDb.props;

const name = sql.identifier(["createAccount"]);

export const createSql = storedFunction({
    name: name,
    language: "plpgsql",
    params: ["_userId integer", "OUT _accountId integer"],
})`
    BEGIN
        INSERT INTO ${AccountT} (${AccountP.balance})
        VALUES (0)
        RETURNING ${AccountP.id} INTO _accountId;

        INSERT INTO ${UserAccountT} (${UserAccountP.userId}, ${UserAccountP.accountId})
        VALUES (_userId, _accountId);
    END;
`;

export const createAccount = (userId: UserDbId): SqlxQuery => {
    return sqlx`SELECT * FROM ${name}(_userId => ${userId});`;
};
