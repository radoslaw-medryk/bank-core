import { accountDbService } from "./services/accountDbService";
import { Big } from "big.js";
import { operationDbService } from "./services/operationDbService";
import { userDbService } from "./services/userDbService";

export const seedTestData = async () => {
    const userId1 = await userDbService.createUser("test@gmail.com", "qwertyuiop1");
    const userId2 = await userDbService.createUser("another@gmail.com", "qwertyuiop1");

    const accountId1 = await accountDbService.createAccount(userId1, "usd");
    const accountId2 = await accountDbService.createAccount(userId2, "usd");

    for (let i = 0; i < 100; i++) {
        const amount = Math.floor(Math.random() * 20000 * 100) / 100;
        await operationDbService.performTransfer(accountId1, accountId2, new Big(amount), "test operation", "food");
    }
};
