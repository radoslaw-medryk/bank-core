import { pool } from "@/db";
import { AccountId, accountFromRow, Account } from "@/models/Account";
import Decimal from "decimal.js";
import { sqlx } from "slonix";
import { transfer } from "@/stored/transfer";
import { createAccount } from "@/stored/createAccount";
import { TransferId } from "@/models/Transfer";
import { toNumber } from "@/helpers/toNumber";
import { getAccount } from "@/stored/getAccount";

class AccountDbService {
    public createAccount = async (): Promise<AccountId> => {
        const sql = createAccount();
        const accountId = await sqlx.oneFirst(pool, sql);
        return toNumber(accountId);
    };

    public transfer = async (fromId: AccountId, toId: AccountId, amount: Decimal): Promise<TransferId> => {
        const sql = transfer(fromId, toId, amount);
        const transferId = await sqlx.oneFirst(pool, sql);
        return toNumber(transferId);
    };

    public getAccount = async (accountId: AccountId): Promise<Account> => {
        const sql = getAccount(accountId);
        const row = await sqlx.one(pool, sql);
        return accountFromRow(row);
    };
}

export const accountDbService = new AccountDbService();
