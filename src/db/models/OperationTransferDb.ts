import { AccountDbId, AccountDb } from "./AccountDb";
import { tableDefinition, propsDefinition, sqlx } from "slonix";
import { QueryResultRowType } from "slonik";
import { toNumber } from "@/db/helpers/toNumber";
import { TransferDbId, TransferDb } from "./TransferDb";
import { OperationDbId, OperationDb } from "./OperationDb";

export class OperationTransferDb {
    public operationId: OperationDbId = 0;
    public transferId: TransferDbId = 0;
    public accountId: AccountDbId = 0;

    public static table = tableDefinition("OperationTransfers");
    public static props = propsDefinition(OperationTransferDb);
}

const t = OperationTransferDb.table;
const p = OperationTransferDb.props;

export const createSql = sqlx`
    DROP TABLE IF EXISTS ${t} CASCADE;
    CREATE TABLE ${t} (
        ${p.operationId} integer REFERENCES ${OperationDb.table},
        ${p.transferId} integer REFERENCES ${TransferDb.table},
        ${p.accountId} integer REFERENCES ${AccountDb.table},

        CONSTRAINT OperationTransfers_pkey PRIMARY KEY (${p.operationId}, ${p.transferId})
    );
`;

export const userAccountFromRow = (row: QueryResultRowType<keyof OperationTransferDb>): OperationTransferDb => {
    return {
        operationId: toNumber(row.operationId),
        transferId: toNumber(row.transferId),
        accountId: toNumber(row.accountId),
    };
};
