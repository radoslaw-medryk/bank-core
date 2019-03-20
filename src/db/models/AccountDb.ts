import { propsDefinition, tableDefinition, sqlx } from "slonix";
import Decimal from "decimal.js";
import { QueryResultRowType } from "slonik";
import { toNumber } from "@/db/helpers/toNumber";
import { toDecimal } from "@/db/helpers/toDecimal";

export type AccountDbId = number;

export class AccountDb {
    public id: AccountDbId = 0;
    public balance: Decimal = new Decimal(0);

    public static table = tableDefinition("Accounts");
    public static props = propsDefinition(AccountDb);
}

const t = AccountDb.table;
const p = AccountDb.props;

export const createSql = sqlx`
    DROP TABLE IF EXISTS ${t} CASCADE;
    CREATE TABLE ${t} (
        ${p.id} serial PRIMARY KEY,
        ${p.balance} numeric NOT NULL DEFAULT 0
    );
`;

export const accountFromRow = (row: QueryResultRowType<keyof AccountDb>): AccountDb => {
    return {
        id: toNumber(row.id),
        balance: toDecimal(row.balance),
    };
};
