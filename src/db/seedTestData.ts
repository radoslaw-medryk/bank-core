import { accountDbService } from "./services/accountDbService";
import { transferDbService } from "./services/transferDbService";
import { Big } from "big.js";

export const seedTestData = async () => {
    const accountId1 = await accountDbService.createAccount();
    const accountId2 = await accountDbService.createAccount();

    for (let i = 0; i < 1000; i++) {
        const amount = Math.floor(Math.random() * 20000 * 100) / 100;
        await transferDbService.transfer(accountId1, accountId2, new Big(amount));
    }
};
