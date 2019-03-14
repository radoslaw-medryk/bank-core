import { sql } from "slonik";
import { propsDefinition, tableDefinition } from "slonix";
import Decimal from "decimal.js";

export type AccountId = number;

export class Account {
    public id: AccountId = 0;
    public balance: Decimal = new Decimal(0);

    public static table = tableDefinition("Accounts");
    public static props = propsDefinition(Account);
}

const t = Account.table;
const p = Account.props;

export const createSql = sql`
    DROP TABLE IF EXISTS ${t} CASCADE;
    CREATE TABLE ${t} (
        ${p.id} serial PRIMARY KEY,
        ${p.balance} numeric NOT NULL DEFAULT 0
    );
`;
