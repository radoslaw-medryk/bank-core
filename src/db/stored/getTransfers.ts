import { sqlx } from "slonix";
import { storedFunction } from "@/db/helpers/storedFunction";
import { sql } from "slonik";
import { TransferDb, TransferDbId } from "@/db/models/TransferDb";

const TransferT = TransferDb.table;
const TransferP = TransferDb.props;

const name = sql.identifier(["getTransfers"]);

export const createSql = storedFunction({
    name: name,
    language: "sql",
    params: ["beforeId integer", "limitCount integer"],
    returns: sqlx`SETOF ${TransferT}`,
})`
    SELECT * FROM ${TransferT}
    WHERE ${TransferP.id} < beforeId
    ORDER BY ${TransferP.id} DESC
    LIMIT limitCount;
`;

export const getTransfers = (beforeId: TransferDbId | undefined, limit: number) => {
    beforeId = beforeId || 999999; // TODO [RM]: quick hack for TEST PURPOSES ONLY.
    return sqlx`SELECT * FROM ${name}(beforeId => ${beforeId}, limitCount => ${limit})`;
};
