import { accountSql } from "@/sql/accountSql";
import { pool } from "@/db";
import { AccountId } from "@/models/Account";
import Decimal from "decimal.js";
import { sqlx } from "slonix";
import { transfer } from "@/stored/transfer";

class AccountDbService {
    public createAccount = async (): Promise<AccountId> => {
        const sql = accountSql.insertDefault();
        const accountId = await sqlx.oneFirst(pool, sql);
        return accountId as AccountId;
    };

    public transfer = async (fromId: AccountId, toId: AccountId, amount: Decimal) => {
        const sql = transfer(fromId, toId, amount);
        await sqlx.query(pool, sql);
    };
}

export const accountDbService = new AccountDbService();
