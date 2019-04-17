import { AccountDbId, AccountDb } from "./AccountDb";
import { tableDefinition, propsDefinition, sqlx } from "slonix";
import { QueryResultRowType } from "slonik";
import { toNumber } from "@/db/helpers/toNumber";
import { toBig } from "@/db/helpers/toBig";
import Big from "big.js";
import { toDate } from "../helpers/toDate";
import { toStringOptional } from "../helpers/toString";

export type OperationDbId = number;

export class OperationDb {
    public id: OperationDbId = 0;
    public accountId: AccountDbId = 0;
    public amount: Big = new Big(0);
    public title: string | undefined = undefined;
    public category: string | undefined = undefined;
    public date: Date = new Date(0);

    public static table = tableDefinition("Operations");
    public static props = propsDefinition(OperationDb);
}

const t = OperationDb.table;
const p = OperationDb.props;

export const createSql = sqlx`
    DROP TABLE IF EXISTS ${t} CASCADE;
    CREATE TABLE ${t} (
        ${p.id} serial PRIMARY KEY,
        ${p.accountId} integer REFERENCES ${AccountDb.table} NOT NULL,
        ${p.amount} numeric NOT NULL,
        ${p.title} varchar(1024),
        ${p.category} varchar(1024),
        ${p.date} timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
`;

export const operationFromRow = (row: QueryResultRowType<keyof OperationDb>): OperationDb => {
    return {
        id: toNumber(row.id),
        accountId: toNumber(row.accountId),
        amount: toBig(row.amount),
        title: toStringOptional(row.title),
        category: toStringOptional(row.category),
        date: toDate(row.date),
    };
};
