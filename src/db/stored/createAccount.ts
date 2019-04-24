import { sqlx, SqlxQuery } from "slonix";
import { storedFunction } from "../helpers/storedFunction";
import { AccountDb } from "@/db/models/AccountDb";
import { sql } from "slonik";
import { UserDbId } from "../models/UserDb";
import { UserAccountDb } from "../models/UserAccountDb";
import { CurrencyCodeDb } from "../models/types/CurrencyCodeDb";

const AccountT = AccountDb.table;
const AccountP = AccountDb.props;

const UserAccountT = UserAccountDb.table;
const UserAccountP = UserAccountDb.props;

const name = sql.identifier(["createAccount"]);

export const createSql = storedFunction({
    name: name,
    language: "plpgsql",
    params: ["_userId integer", "_currency varchar", "OUT _accountId integer"],
})`
    BEGIN
        INSERT INTO ${AccountT} (${AccountP.balance}, ${AccountP.currency})
        VALUES (0, _currency)
        RETURNING ${AccountP.id} INTO _accountId;

        INSERT INTO ${UserAccountT} (${UserAccountP.userId}, ${UserAccountP.accountId})
        VALUES (_userId, _accountId);
    END;
`;

export const createAccount = (userId: UserDbId, currency: CurrencyCodeDb): SqlxQuery => {
    return sqlx`SELECT * FROM ${name}(_userId => ${userId}, _currency => ${currency});`;
};
