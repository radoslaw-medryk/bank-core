import { pool } from "@/db";
import { AccountDbId, accountFromRow, AccountDb } from "@/db/models/AccountDb";
import { sqlx } from "slonix";
import { createAccount } from "@/db/stored/createAccount";
import { toNumber } from "@/db/helpers/toNumber";
import { getAccount } from "@/db/stored/getAccount";
import { UserDbId } from "../models/UserDb";
import { getUserAccounts } from "../stored/getUserAccounts";
import { isUserAccount } from "../stored/isUserAccount";
import { toBoolean } from "../helpers/toBoolean";

// TODO [RM]: wrap db exceptions into meaningful exceptions

class AccountDbService {
    public createAccount = async (userId: UserDbId): Promise<AccountDbId> => {
        const sql = createAccount(userId);
        const accountId = await sqlx.oneFirst(pool, sql);
        return toNumber(accountId);
    };

    public getAccount = async (accountId: AccountDbId): Promise<AccountDb> => {
        const sql = getAccount(accountId);
        const row = await sqlx.one(pool, sql);
        return accountFromRow(row);
    };

    public getUserAccounts = async (userId: UserDbId): Promise<AccountDb[]> => {
        const sql = getUserAccounts(userId);
        const rows = await sqlx.any(pool, sql);
        return rows.map(accountFromRow);
    };

    public isUserAccount = async (userId: UserDbId, accountId: AccountDbId) => {
        const sql = isUserAccount(userId, accountId);
        const result = await sqlx.oneFirst(pool, sql);
        return toBoolean(result);
    };
}

export const accountDbService = new AccountDbService();
