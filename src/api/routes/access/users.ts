import { check } from "../../helpers/check";
import { responseSuccess } from "../../helpers/responseSuccess";
import { Parsing } from "rusane";
import { validateStringLength, validateEmail } from "rusane/dist/validation";
import Router from "koa-router";
import { userDbService } from "@/db/services/userDbService";
import { ApiRegisterUserResponse } from "@radoslaw-medryk/bank-core-shared";
import { UserDbId } from "@/db/models/UserDb";
import { dbDataInitializer } from "@/db/seedInitData";
import { friendDbService } from "@/db/services/friendDbService";
import { accountDbService } from "@/db/services/accountDbService";
import { operationDbService } from "@/db/services/operationDbService";
import { mockTransferName, mockCategory } from "@/helpers/mock";
import Big from "big.js";

const r = new Router({
    prefix: "/api/v1/access/users",
});

// TODO [RM]: swagger
r.post("/", async ctx => {
    const email = check(
        ctx.request.body,
        "email",
        Parsing.parseString,
        validateStringLength({ minLength: 1, maxLength: 256 }),
        validateEmail
    );
    const password = check(
        ctx.request.body,
        "password",
        Parsing.parseString,
        validateStringLength({ minLength: 8, maxLength: 256 })
        // TODO [RM]: validate password strength, etc.
    );

    const userId = await userDbService.createUser(email, password);

    await initNewUserDummyData(userId); // TODO [RM]: TEMP, TEST only

    const response: ApiRegisterUserResponse = {
        userId: userId,
    };

    ctx.body = responseSuccess(response);
});

const initNewUserDummyData = async (userId: UserDbId) => {
    // TODO [RM]: dummy data, for test purposes only:

    const { bankAccountIds, predefinedFriendIds } = await dbDataInitializer.getInitData();

    for (let i = 0; i < predefinedFriendIds.length; i++) {
        await friendDbService.makeFriend(userId, predefinedFriendIds[i]);
    }

    const accountUsdId = await accountDbService.createUserAccount(userId, "usd");
    const accountCnyId = await accountDbService.createUserAccount(userId, "cny");
    const accountPlnId = await accountDbService.createUserAccount(userId, "pln");

    const bankAccountUsdId = bankAccountIds["usd"]!;
    const bankAccountCnyId = bankAccountIds["cny"]!;
    const bankAccountPlnId = bankAccountIds["pln"]!;

    await operationDbService.performTransfer(bankAccountUsdId, accountUsdId, new Big("100000"), "Top Up", "topup");
    await operationDbService.performTransfer(bankAccountCnyId, accountCnyId, new Big("10000"), "Top Up", "topup");

    for (let i = 0; i < 200; i++) {
        const amount = Math.floor(Math.random() * 500 * 100) / 100;
        const title = mockTransferName();
        const category = mockCategory();
        await operationDbService.performTransfer(accountUsdId, bankAccountUsdId, new Big(amount), title, category);
    }
};

export default r;
