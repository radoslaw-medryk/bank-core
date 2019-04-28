import { sqlx } from "slonix";
import { storedFunction } from "@/db/helpers/storedFunction";
import { sql } from "slonik";
import { AccountDbId } from "../models/AccountDb";
import { OperationDb } from "../models/OperationDb";

const OperationT = OperationDb.table;
const OperationP = OperationDb.props;

const name = sql.identifier(["getAccountOperations"]);

export const createSql = storedFunction({
    name: name,
    language: "sql",
    params: ["_accountId integer"],
    returns: sqlx`SETOF ${OperationT}`,
})`
    SELECT * FROM ${OperationT}
    WHERE ${OperationP.accountId} = _accountId
`;

export const getAccountOperations = (accountId: AccountDbId) => {
    return sqlx`SELECT * FROM ${name}(_accountId => ${accountId})`;
};
