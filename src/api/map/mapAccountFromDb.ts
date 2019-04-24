import { AccountDb } from "@/db/models/AccountDb";
import { ApiAccount } from "@radoslaw-medryk/bank-core-shared/dist/ApiAccount";
import { mapBigFromDb } from "./mapBigFromDb";
import { mapCurrencyFromDb } from "./mapCurrencyFromDb";

// TODO [RM]: contains dummy/test data partially for now

export const mapAccountFromDb = (dbAccount: AccountDb): ApiAccount => {
    return {
        id: dbAccount.id,
        balance: mapBigFromDb(dbAccount.balance),
        currency: mapCurrencyFromDb(dbAccount.currency),
    };
};
