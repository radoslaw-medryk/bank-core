import { accountDbService } from "./services/accountDbService";
import { Big } from "big.js";
import { operationDbService } from "./services/operationDbService";
import { userDbService } from "./services/userDbService";

export const seedTestData = async () => {
    const userId1 = await userDbService.createUser("test@gmail.com", "qwertyuiop1");
    const userId2 = await userDbService.createUser("another@gmail.com", "qwertyuiop1");

    const accountUser1Usd = await accountDbService.createAccount(userId1, "usd");
    const accountUser1Cny = await accountDbService.createAccount(userId1, "cny");
    const accountUser1Pln = await accountDbService.createAccount(userId1, "pln");

    const accountUser2Usd = await accountDbService.createAccount(userId2, "usd");
    const accountUser2Cny = await accountDbService.createAccount(userId2, "cny");
    const accountUser2Pln = await accountDbService.createAccount(userId2, "pln");

    for (let i = 0; i < 100; i++) {
        const amount = Math.floor(Math.random() * 20000 * 100) / 100;
        await operationDbService.performTransfer(
            accountUser1Usd,
            accountUser2Usd,
            new Big(amount),
            "test operation",
            "food"
        );
    }

    for (let i = 0; i < 5; i++) {
        const amount = Math.floor(Math.random() * 200 * 100) / 100;
        await operationDbService.performTransfer(
            accountUser2Cny,
            accountUser1Cny,
            new Big(amount),
            "test chinese operation",
            "groceries"
        );
    }
};
