import { sqlx } from "slonix";
import { storedFunction } from "@/db/helpers/storedFunction";
import { sql } from "slonik";
import { TransferDb, TransferDbId } from "@/db/models/TransferDb";

const TransferT = TransferDb.table;
const TransferP = TransferDb.props;

const name = sql.identifier(["getTransfer"]);

export const createSql = storedFunction({
    name: name,
    language: "sql",
    params: ["_transferId integer"],
    returns: sqlx`SETOF ${TransferT}`,
})`
    SELECT * FROM ${TransferT}
    WHERE ${TransferP.id} = _transferId;
`;

export const getTransfer = (transferId: TransferDbId) => {
    return sqlx`SELECT * FROM ${name}(_transferId => ${transferId})`;
};
