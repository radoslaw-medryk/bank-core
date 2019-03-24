import { pool } from "@/db";
import { AccountDbId, accountFromRow, AccountDb } from "@/db/models/AccountDb";
import { sqlx } from "slonix";
import { createAccount } from "@/db/stored/createAccount";
import { toNumber } from "@/db/helpers/toNumber";
import { getAccount } from "@/db/stored/getAccount";

class AccountDbService {
    public createAccount = async (): Promise<AccountDbId> => {
        const sql = createAccount();
        const accountId = await sqlx.oneFirst(pool, sql);
        return toNumber(accountId);
    };

    public getAccount = async (accountId: AccountDbId): Promise<AccountDb> => {
        const sql = getAccount(accountId);
        const row = await sqlx.one(pool, sql);
        return accountFromRow(row);
    };
}

export const accountDbService = new AccountDbService();
