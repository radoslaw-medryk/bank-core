import { sqlx, SqlxQuery } from "slonix";
import { AccountDbId, AccountDb } from "@/db/models/AccountDb";
import { sql } from "slonik";
import { storedFunction } from "../helpers/storedFunction";
import { TransferDb } from "@/db/models/TransferDb";
import Big from "big.js";
import { OperationDb } from "../models/OperationDb";
import { OperationTransferDb } from "../models/OperationTransferDb";

const AccountT = AccountDb.table;
const AccountP = AccountDb.props;

const TransferT = TransferDb.table;
const TransferP = TransferDb.props;

const OperationT = OperationDb.table;
const OperationP = OperationDb.props;

const OperationTransferT = OperationTransferDb.table;
const OperationTransferP = OperationTransferDb.props;

const name = sql.identifier(["performTransferOperation"]);

// TODO [RM]: split into smaller stored functions

export const createSql = storedFunction({
    name: name,
    language: "plpgsql",
    params: [
        "_fromId integer",
        "_toId integer",
        "_amount numeric",
        "_title varchar(1024)",
        "_category varchar(1024)",
        `OUT "_fromOperationId" integer`,
        `OUT "_toOperationId" integer`,
    ],
})`
    DECLARE _transactionId integer;
    BEGIN
        IF NOT EXISTS (
            SELECT 1 FROM ${AccountT}
            WHERE ${AccountP.id} = _fromId
            AND ${AccountP.currency} = (SELECT ${AccountP.currency} FROM ${AccountT} WHERE ${AccountP.id} = _toId)
        ) THEN RAISE EXCEPTION 'One of accounts doesnt exist or currency mismatch.';
        END IF;

        UPDATE ${AccountT}
        SET ${AccountP.balance} = ${AccountP.balance} - _amount
        WHERE ${AccountP.id} = _fromId
        AND (${AccountP.negativeAllowed} = TRUE OR ${AccountP.balance} >= _amount);

        IF NOT FOUND THEN RAISE EXCEPTION 'From account not found or insufficient funds.';
        END IF;

        UPDATE ${AccountT}
        SET ${AccountP.balance} = ${AccountP.balance} + _amount
        WHERE ${AccountP.id} = _toId;

        INSERT INTO ${TransferT} (${TransferP.fromId}, ${TransferP.toId}, ${TransferP.amount})
        VALUES (_fromId, _toId, _amount)
        RETURNING ${TransferP.id} INTO _transactionId;

        INSERT INTO ${OperationT}
        (${OperationP.accountId}, ${OperationP.amount}, ${OperationP.title}, ${OperationP.category})
        VALUES (_fromId, -_amount, _title, _category)
        RETURNING ${OperationP.id} INTO "_fromOperationId";

        INSERT INTO ${OperationTransferT}
        (${OperationTransferP.operationId}, ${OperationTransferP.transferId}, ${OperationTransferP.accountId})
        VALUES ("_fromOperationId", _transactionId, _fromId);

        INSERT INTO ${OperationT}
        (${OperationP.accountId}, ${OperationP.amount}, ${OperationP.title}, ${OperationP.category})
        VALUES (_toId, _amount, _title, _category)
        RETURNING ${OperationP.id} INTO "_toOperationId";

        INSERT INTO ${OperationTransferT}
        (${OperationTransferP.operationId}, ${OperationTransferP.transferId}, ${OperationTransferP.accountId})
        VALUES ("_toOperationId", _transactionId, _toId);
    END;
`;

export const performTransferOperation = (
    fromId: AccountDbId,
    toId: AccountDbId,
    amount: Big,
    title: string | undefined,
    category: string | undefined
): SqlxQuery => {
    const titleArg = title !== undefined ? title : sql.raw("NULL");
    const categoryArg = category !== undefined ? category : sql.raw("NULL");

    return sqlx`SELECT * FROM ${name}(_fromId => ${fromId}, _toId => ${toId}, _amount => ${amount}, _title => ${titleArg}, _category => ${categoryArg});`;
};
