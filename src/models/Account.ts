import { propsDefinition, tableDefinition, sqlx } from "slonix";
import Decimal from "decimal.js";
import { QueryResultRowType } from "slonik";
import { toNumber } from "@/helpers/toNumber";
import { toDecimal } from "@/helpers/toDecimal";

export type AccountId = number;

export class Account {
    public id: AccountId = 0;
    public balance: Decimal = new Decimal(0);

    public static table = tableDefinition("Accounts");
    public static props = propsDefinition(Account);
}

const t = Account.table;
const p = Account.props;

export const createSql = sqlx`
    DROP TABLE IF EXISTS ${t} CASCADE;
    CREATE TABLE ${t} (
        ${p.id} serial PRIMARY KEY,
        ${p.balance} numeric NOT NULL DEFAULT 0
    );
`;

export const accountFromRow = (row: QueryResultRowType<keyof Account>): Account => {
    return {
        id: toNumber(row.id),
        balance: toDecimal(row.balance),
    };
};
