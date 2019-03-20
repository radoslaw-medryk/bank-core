import { sqlx, SqlxQuery } from "slonix";
import { AccountId, Account } from "@/models/Account";
import { Decimal } from "decimal.js";
import { sql } from "slonik";
import { storedFunction } from "../helpers/storedFunction";
import { Transfer } from "@/models/Transfer";

const AccountT = Account.table;
const AccountP = Account.props;

const TransferT = Transfer.table;
const TransferP = Transfer.props;

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

export const transfer = (fromId: AccountId, toId: AccountId, amount: Decimal): SqlxQuery => {
    return sqlx`SELECT * FROM ${name}(fromId => ${fromId}, toId => ${toId}, amount => ${amount});`;
};
