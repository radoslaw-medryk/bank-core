import { AccountDbId, AccountDb } from "./AccountDb";
import Decimal from "decimal.js";
import { tableDefinition, propsDefinition, sqlx } from "slonix";
import { QueryResultRowType } from "slonik";
import { toNumber } from "@/db/helpers/toNumber";
import { toDecimal } from "@/db/helpers/toDecimal";

export type TransferDbId = number;

export class TransferDb {
    public id: TransferDbId = 0;
    public fromId: AccountDbId = 0;
    public toId: AccountDbId = 0;
    public amount: Decimal = new Decimal(0);

    public static table = tableDefinition("Transfers");
    public static props = propsDefinition(TransferDb);
}

const t = TransferDb.table;
const p = TransferDb.props;

export const createSql = sqlx`
    DROP TABLE IF EXISTS ${t} CASCADE;
    CREATE TABLE ${t} (
        ${p.id} serial PRIMARY KEY,
        ${p.fromId} integer REFERENCES ${AccountDb.table},
        ${p.toId} integer REFERENCES ${AccountDb.table},
        ${p.amount} numeric NOT NULL
    );
`;

export const transferFromRow = (row: QueryResultRowType<keyof TransferDb>): TransferDb => {
    return {
        id: toNumber(row.id),
        fromId: toNumber(row.fromId),
        toId: toNumber(row.toId),
        amount: toDecimal(row.amount),
    };
};
