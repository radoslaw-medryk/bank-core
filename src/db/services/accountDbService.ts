import { pool } from "@/db";
import { AccountDbId, accountFromRow, AccountDb } from "@/db/models/AccountDb";
import Decimal from "decimal.js";
import { sqlx } from "slonix";
import { transfer } from "../stored/transfer";
import { createAccount } from "@/db/stored/createAccount";
import { TransferDbId } from "@/db/models/TransferDb";
import { toNumber } from "@/db/helpers/toNumber";
import { getAccount } from "@/db/stored/getAccount";

class AccountDbService {
    public createAccount = async (): Promise<AccountDbId> => {
        const sql = createAccount();
        const accountId = await sqlx.oneFirst(pool, sql);
        return toNumber(accountId);
    };

    public transfer = async (fromId: AccountDbId, toId: AccountDbId, amount: Decimal): Promise<TransferDbId> => {
        const sql = transfer(fromId, toId, amount);
        const transferId = await sqlx.oneFirst(pool, sql);
        return toNumber(transferId);
    };

    public getAccount = async (accountId: AccountDbId): Promise<AccountDb> => {
        const sql = getAccount(accountId);
        const row = await sqlx.one(pool, sql);
        return accountFromRow(row);
    };
}

export const accountDbService = new AccountDbService();
