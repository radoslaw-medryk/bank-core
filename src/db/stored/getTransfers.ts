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
    params: ["_beforeId integer", "_limitCount integer"],
    returns: sqlx`SETOF ${TransferT}`,
})`
    SELECT * FROM ${TransferT}
    WHERE ${TransferP.id} < _beforeId
    ORDER BY ${TransferP.id} DESC
    LIMIT _limitCount;
`;

export const getTransfers = (beforeId: TransferDbId | undefined, limit: number) => {
    beforeId = beforeId || 9999999; // TODO [RM]: quick hack for TEST PURPOSES ONLY.
    return sqlx`SELECT * FROM ${name}(_beforeId => ${beforeId}, _limitCount => ${limit})`;
};
