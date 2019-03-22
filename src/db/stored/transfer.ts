import { sqlx, SqlxQuery } from "slonix";
import { AccountDbId, AccountDb } from "@/db/models/AccountDb";
import { sql } from "slonik";
import { storedFunction } from "../helpers/storedFunction";
import { TransferDb } from "@/db/models/TransferDb";
import Big from "big.js";

const AccountT = AccountDb.table;
const AccountP = AccountDb.props;

const TransferT = TransferDb.table;
const TransferP = TransferDb.props;

const name = sql.identifier(["transfer"]);

export const createSql = storedFunction({
    name: name,
    language: "plpgsql",
    params: ["fromId integer", "toId integer", "amount numeric", "OUT transactionId numeric"],
})`
    BEGIN
        UPDATE ${AccountT} SET ${AccountP.balance} = ${AccountP.balance} - amount WHERE ${AccountP.id} = fromId;
        UPDATE ${AccountT} SET ${AccountP.balance} = ${AccountP.balance} + amount WHERE ${AccountP.id} = toId;

        INSERT INTO ${TransferT} (${TransferP.fromId}, ${TransferP.toId}, ${TransferP.amount})
        VALUES (fromId, toId, amount)
        RETURNING ${TransferP.id} INTO transactionId;
    END;
`;

export const transfer = (fromId: AccountDbId, toId: AccountDbId, amount: Big): SqlxQuery => {
    return sqlx`SELECT * FROM ${name}(fromId => ${fromId}, toId => ${toId}, amount => ${amount});`;
};
