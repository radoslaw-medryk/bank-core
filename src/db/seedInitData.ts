import { AccountDbId } from "./models/AccountDb";
import { accountDbService } from "./services/accountDbService";
import { CurrencyCodeDb } from "./models/types/CurrencyCodeDb";
import { FriendDbId } from "./models/FriendDb";
import { userDbService } from "./services/userDbService";

export type InitData = {
    bankAccountIds: {
        [currency: string]: AccountDbId | undefined;
    };

    predefinedFriendIds: FriendDbId[]; // TODO [RM]: test only
};

const seedInitData = async (): Promise<InitData> => {
    const currencies: CurrencyCodeDb[] = ["usd", "pln", "cny"]; // TODO [RM]: make not hard-coded here

    const result: InitData = {
        bankAccountIds: {},
        predefinedFriendIds: [],
    };

    for (const currency of currencies) {
        const accountId = await accountDbService.createBankAccount(currency);
        result.bankAccountIds = {
            ...result.bankAccountIds,
            [currency]: accountId,
        };
    }

    for (let i = 0; i < 4; i++) {
        const friendId = await userDbService.createUser(`test${i}@gmail.com`, "qwertyuiop1");
        result.predefinedFriendIds = [...result.predefinedFriendIds, friendId];
    }

    return result;
};

export class DbDataInitializer {
    private data: InitData | undefined;

    public getInitData = async (): Promise<InitData> => {
        if (this.data) {
            return this.data;
        }

        this.data = await seedInitData();
        return this.data;
    };
}

export const dbDataInitializer = new DbDataInitializer();
