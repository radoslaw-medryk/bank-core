import { sqlx } from "slonix";
import { storedFunction } from "@/db/helpers/storedFunction";
import { sql } from "slonik";
import { OperationDb, OperationDbId } from "../models/OperationDb";
import { AccountDbId } from "../models/AccountDb";

const OperationT = OperationDb.table;
const OperationP = OperationDb.props;

const name = sql.identifier(["getOperations"]);

export const createSql = storedFunction({
    name: name,
    language: "sql",
    params: ["_accountId integer", "_beforeId integer", "_limitCount integer"],
    returns: sqlx`SETOF ${OperationT}`,
})`
    SELECT * FROM ${OperationT}
    WHERE ${OperationP.accountId} = _accountId
    AND ${OperationP.id} < _beforeId
    ORDER BY ${OperationP.id} DESC
    LIMIT _limitCount;
`;

export const getOperations = (accountId: AccountDbId, beforeId: OperationDbId | undefined, limit: number) => {
    beforeId = beforeId || 9999999; // TODO [RM]: quick hack for TEST PURPOSES ONLY.
    return sqlx`SELECT * FROM ${name}(_accountId => ${accountId}, _beforeId => ${beforeId}, _limitCount => ${limit})`;
};
