import { sqlx, SqlxQuery } from "slonix";
import { storedFunction } from "../helpers/storedFunction";
import { AccountDb } from "@/db/models/AccountDb";
import { sql } from "slonik";
import { CurrencyCodeDb } from "../models/types/CurrencyCodeDb";

const AccountT = AccountDb.table;
const AccountP = AccountDb.props;

const name = sql.identifier(["createBankAccount"]);

export const createSql = storedFunction({
    name: name,
    language: "plpgsql",
    params: ["_currency varchar", "OUT _accountId integer"],
})`
    BEGIN
        INSERT INTO ${AccountT} (${AccountP.balance}, ${AccountP.currency}, ${AccountP.negativeAllowed})
        VALUES (0, _currency, TRUE)
        RETURNING ${AccountP.id} INTO _accountId;
    END;
`;

export const createBankAccount = (currency: CurrencyCodeDb): SqlxQuery => {
    return sqlx`SELECT * FROM ${name}(_currency => ${currency});`;
};
