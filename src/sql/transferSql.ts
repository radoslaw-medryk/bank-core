import { Transfer } from "@/models/Transfer";
import { AccountId } from "@/models/Account";
import { Decimal } from "decimal.js";
import { sqlx } from "slonix";

const t = Transfer.table;
const p = Transfer.props;

class TransferSql {
    public insert = (fromId: AccountId, toId: AccountId, amount: Decimal) => sqlx`
        INSERT INTO ${t}
        (${p.fromId}, ${p.toId}, ${p.amount})
        VALUES
        (${fromId}, ${toId}, ${amount});
    `;
}

export const transferSql = new TransferSql();
