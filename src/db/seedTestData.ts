import { accountDbService } from "./services/accountDbService";
import { Big } from "big.js";
import { operationDbService } from "./services/operationDbService";
import { userDbService } from "./services/userDbService";
import { friendDbService } from "./services/friendDbService";
import { InitData } from "./seedInitData";
import { InternalError } from "@/InternalError";

export const seedTestData = async (initData: InitData) => {
    // const bankAccountUsd = initData.bankAccountIds["usd"];
    // const bankAccountCny = initData.bankAccountIds["cny"];
    // const bankAccountPln = initData.bankAccountIds["pln"];
    // if (!bankAccountUsd || !bankAccountCny || !bankAccountPln) {
    //     throw new InternalError("Missing bank accounts.");
    // }
    // const userId1 = await userDbService.createUser("test@gmail.com", "qwertyuiop1");
    // const userId2 = await userDbService.createUser("another@gmail.com", "qwertyuiop1");
    // const friendId1 = await friendDbService.makeFriend(userId1, userId2);
    // const friendId2 = await friendDbService.makeFriend(userId2, userId1);
    // const accountUser1Usd = await accountDbService.createUserAccount(userId1, "usd");
    // const accountUser1Cny = await accountDbService.createUserAccount(userId1, "cny");
    // const accountUser1Pln = await accountDbService.createUserAccount(userId1, "pln");
    // const accountUser2Usd = await accountDbService.createUserAccount(userId2, "usd");
    // const accountUser2Cny = await accountDbService.createUserAccount(userId2, "cny");
    // const accountUser2Pln = await accountDbService.createUserAccount(userId2, "pln");
    // await operationDbService.performTransfer(bankAccountUsd, accountUser1Usd, new Big("2000000"), "Top up", "topup");
    // await operationDbService.performTransfer(bankAccountCny, accountUser2Cny, new Big("2000"), "Top up", "topup");
    // await operationDbService.performTransfer(bankAccountPln, accountUser1Pln, new Big("1000"), "Top up", "topup");
    // await operationDbService.performTransfer(bankAccountPln, accountUser2Pln, new Big("1000"), "Top up", "topup");
    // for (let i = 0; i < 100; i++) {
    //     const amount = Math.floor(Math.random() * 20000 * 100) / 100;
    //     await operationDbService.performTransfer(
    //         accountUser1Usd,
    //         accountUser2Usd,
    //         new Big(amount),
    //         "test operation",
    //         "food"
    //     );
    // }
    // for (let i = 0; i < 5; i++) {
    //     const amount = Math.floor(Math.random() * 200 * 100) / 100;
    //     await operationDbService.performTransfer(
    //         accountUser2Cny,
    //         accountUser1Cny,
    //         new Big(amount),
    //         "test chinese operation",
    //         "groceries"
    //     );
    // }
};
