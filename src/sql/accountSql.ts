import { AccountId, Account } from "@/models/Account";
import Decimal from "decimal.js";
import { sqlx } from "slonix";

const t = Account.table;
const p = Account.props;

class AccountSql {
    public insertDefault = () => sqlx`
        INSERT INTO ${t}
        DEFAULT VALUES
        RETURNING ${p.id}
    `;

    public transfer = (fromId: AccountId, toId: AccountId, amount: Decimal) => sqlx.noPrepared`
        BEGIN;
            UPDATE ${t} SET ${p.balance} = ${p.balance} - ${amount} WHERE ${p.id} = ${fromId};
            UPDATE ${t} SET ${p.balance} = ${p.balance} + ${amount} WHERE ${p.id} = ${toId};
        COMMIT;
    `;
}

export const accountSql = new AccountSql();
