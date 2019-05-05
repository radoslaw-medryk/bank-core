import { pool } from "@/db";
import { AccountDbId, accountFromRow, AccountDb } from "@/db/models/AccountDb";
import { sqlx } from "slonix";
import { createUserAccount } from "@/db/stored/createUserAccount";
import { toNumber } from "@/db/helpers/toNumber";
import { getUserAccount } from "@/db/stored/getUserAccount";
import { UserDbId } from "../models/UserDb";
import { getUserAccounts } from "../stored/getUserAccounts";
import { isUserAccount } from "../stored/isUserAccount";
import { toBoolean } from "../helpers/toBoolean";
import { CurrencyCodeDb } from "../models/types/CurrencyCodeDb";
import { createBankAccount } from "../stored/createBankAccount";

// TODO [RM]: wrap db exceptions into meaningful exceptions

class AccountDbService {
    public createBankAccount = async (currency: CurrencyCodeDb): Promise<AccountDbId> => {
        const sql = createBankAccount(currency);
        const accountId = await sqlx.oneFirst(pool, sql);
        return toNumber(accountId);
    };

    public createUserAccount = async (userId: UserDbId, currency: CurrencyCodeDb): Promise<AccountDbId> => {
        const sql = createUserAccount(userId, currency);
        const accountId = await sqlx.oneFirst(pool, sql);
        return toNumber(accountId);
    };

    public getUserAccount = async (userId: UserDbId, accountId: AccountDbId): Promise<AccountDb> => {
        const sql = getUserAccount(userId, accountId);
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
