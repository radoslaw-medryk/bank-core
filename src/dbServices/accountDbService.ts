import { accountSql } from "@/sql/accountSql";
import { pool } from "@/db";
import { AccountId } from "@/models/Account";
import Decimal from "decimal.js";

class AccountDbService {
    public createAccount = async (): Promise<AccountId> => {
        const sql = accountSql.insertDefault();
        const accountId = await pool.oneFirst(sql);
        return accountId as AccountId;
    };

    public transfer = async (fromId: AccountId, toId: AccountId, amount: Decimal) => {
        const sql = accountSql.transfer(fromId, toId, amount);
        await pool.query(sql);
    };
}

export const accountDbService = new AccountDbService();
