import { propsDefinition, tableDefinition, sqlx } from "slonix";
import { QueryResultRowType } from "slonik";
import { Big } from "big.js";
import { toNumber } from "@/db/helpers/toNumber";
import { toBig } from "@/db/helpers/toBig";
import { toString } from "@/db/helpers/toString";
import { CurrencyCodeDb } from "./types/CurrencyCodeDb";
import { toCurrencyCode } from "../helpers/toCurrencyCode";
import { toBoolean } from "../helpers/toBoolean";

export type AccountDbId = number;

export class AccountDb {
    public id: AccountDbId = 0;
    public balance: Big = new Big(0);
    public currency: CurrencyCodeDb = "usd"; // TODO [RM]: all allowed currencies in its own table, make this FK
    public negativeAllowed: boolean = false;

    public static table = tableDefinition("Accounts");
    public static props = propsDefinition(AccountDb);
}

const t = AccountDb.table;
const p = AccountDb.props;

export const createSql = sqlx`
    DROP TABLE IF EXISTS ${t} CASCADE;
    CREATE TABLE ${t} (
        ${p.id} serial PRIMARY KEY,
        ${p.balance} numeric NOT NULL DEFAULT 0,
        ${p.currency} varchar NOT NULL,
        ${p.negativeAllowed} boolean NOT NULL DEFAULT FALSE
    );
`;

export const accountFromRow = (row: QueryResultRowType<keyof AccountDb>): AccountDb => {
    return {
        id: toNumber(row.id),
        balance: toBig(row.balance),
        currency: toCurrencyCode(row.currency),
        negativeAllowed: toBoolean(row.negativeAllowed),
    };
};
