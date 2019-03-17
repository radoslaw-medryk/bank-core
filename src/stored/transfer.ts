import { sqlx, SqlxQuery } from "slonix";
import { AccountId, Account } from "@/models/Account";
import { Decimal } from "decimal.js";
import { sql } from "slonik";
import { storedFunction } from "./storedFunction";
import { Transfer } from "@/models/Transfer";

const AccT = Account.table;
const AccP = Account.props;

const TrT = Transfer.table;
const TrP = Transfer.props;

const name = "transfer";
export const createSql = storedFunction({
    name: name,
    params: ["fromId integer", "toId integer", "amount numeric", "OUT transactionId numeric"],
})`
    UPDATE ${AccT} SET ${AccP.balance} = ${AccP.balance} - amount WHERE ${AccP.id} = fromId;
    UPDATE ${AccT} SET ${AccP.balance} = ${AccP.balance} + amount WHERE ${AccP.id} = toId;

    INSERT INTO ${TrT} (${TrP.fromId}, ${TrP.toId}, ${TrP.amount})
    VALUES (fromId, toId, amount)
    RETURNING ${TrP.id} INTO transactionId;
`;

export const transfer = (fromId: AccountId, toId: AccountId, amount: Decimal): SqlxQuery => {
    const _name = sql.identifier([name]);
    return sqlx`SELECT ${_name}(fromId => ${fromId}, toId => ${toId}, amount => ${amount});`;
};
