import { AccountDbId } from "./models/AccountDb";
import { accountDbService } from "./services/accountDbService";
import { CurrencyCodeDb } from "./models/types/CurrencyCodeDb";

export type InitData = {
    bankAccountIds: {
        [currency: string]: AccountDbId | undefined;
    };
};

export const seedInitData = async () => {
    const currencies: CurrencyCodeDb[] = ["usd", "pln", "cny"]; // TODO [RM]: make not hard-coded here

    const result: InitData = {
        bankAccountIds: {},
    };

    for (const currency of currencies) {
        const accountId = await accountDbService.createBankAccount(currency);
        result.bankAccountIds = {
            ...result.bankAccountIds,
            [currency]: accountId,
        };
    }

    return result;
};
