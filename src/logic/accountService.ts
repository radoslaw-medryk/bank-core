import { Account, Accounts, AccountId } from "@/models/Account";
import { db } from "@/db";
import { Decimal } from "decimal.js";
import { _i } from "@/_i";

class AccountService {
    public createAccount = async (): Promise<Account> => {
        const account: Account = {
            balance: 0,
        };

        const [id] = await db(Accounts)
            .insert(account)
            .returning("id");

        return {
            ...account,
            id: id,
        };
    };

    public transfer = async (from: AccountId, to: AccountId, amount: Decimal) => {
        await db.raw(
            `
            BEGIN;
            UPDATE ${_i(Accounts)} SET balance = balance - ? WHERE id = ?;
            UPDATE ${_i(Accounts)} SET balance = balance + ? WHERE id = ?;
            END;
        `,
            [amount.toString(), from, amount.toString(), to]
        );
    };
}

export const accountService = new AccountService();
