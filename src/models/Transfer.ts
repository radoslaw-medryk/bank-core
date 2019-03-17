import { AccountId, Account } from "./Account";
import Decimal from "decimal.js";
import { tableDefinition, propsDefinition, sqlx } from "slonix";

export type TransferId = number;

export class Transfer {
    public id: TransferId = 0;
    public fromId: AccountId = 0;
    public toId: AccountId = 0;
    public amount: Decimal = new Decimal(0);

    public static table = tableDefinition("Transfers");
    public static props = propsDefinition(Transfer);
}

const t = Transfer.table;
const p = Transfer.props;

export const createSql = sqlx`
    DROP TABLE IF EXISTS ${t} CASCADE;
    CREATE TABLE ${t} (
        ${p.id} serial PRIMARY KEY,
        ${p.fromId} integer REFERENCES ${Account.table},
        ${p.toId} integer REFERENCES ${Account.table},
        ${p.amount} numeric NOT NULL
    );
`;
