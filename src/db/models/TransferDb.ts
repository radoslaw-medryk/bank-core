import { AccountDbId, AccountDb } from "./AccountDb";
import { tableDefinition, propsDefinition, sqlx } from "slonix";
import { QueryResultRowType } from "slonik";
import { toNumber } from "@/db/helpers/toNumber";
import { toBig } from "@/db/helpers/toBig";
import Big from "big.js";
import { toDate } from "../helpers/toDate";

export type TransferDbId = number;

export class TransferDb {
    public id: TransferDbId = 0;
    public fromId: AccountDbId = 0;
    public toId: AccountDbId = 0;
    public amount: Big = new Big(0);
    public date: Date = new Date(0);

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
        ${p.amount} numeric NOT NULL,
        ${p.date} timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
`;

export const transferFromRow = (row: QueryResultRowType<keyof TransferDb>): TransferDb => {
    return {
        id: toNumber(row.id),
        fromId: toNumber(row.fromId),
        toId: toNumber(row.toId),
        amount: toBig(row.amount),
        date: toDate(row.date),
    };
};
