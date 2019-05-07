import { check } from "../../helpers/check";
import { validateNumberId } from "../../validation/validation/validateNumberId";
import { responseSuccess } from "../../helpers/responseSuccess";
import { Parsing, Validation } from "rusane";
import Router from "koa-router";
import { requireJwt } from "../../requireJwt";
import { friendDbService } from "@/db/services/friendDbService";
import { accountDbService } from "@/db/services/accountDbService";
import { operationDbService } from "@/db/services/operationDbService";
import { validateAmount } from "@/api/validation/validation/validateAmount";
import { ApiTransferFriendResponse } from "@radoslaw-medryk/bank-core-shared";

const r = new Router({
    prefix: "/api/v1/friends/:friendId/transfers",
});

// TODO [RM]: swagger
r.post("/", requireJwt, async ctx => {
    const userId = check(ctx.state.token, "sub", Parsing.parseNumber, validateNumberId);
    const friendId = check(ctx.params, "friendId", Parsing.parseNumber, validateNumberId);

    const userAccountId = check(ctx.request.body, "accountId", Parsing.parseNumber, validateNumberId);
    const amount = check(ctx.request.body, "amount", Parsing.parseBig, validateAmount);
    const title = check(
        ctx.request.body,
        "title",
        Parsing.parseString,
        Validation.validateStringLength({ minLength: 1, maxLength: 64 })
    );

    const userAccount = await accountDbService.getUserAccount(userId, userAccountId);
    const currency = userAccount.currency;

    const dbFriend = await friendDbService.getUserFriend(userId, friendId);
    const friendUserId = dbFriend.friendUserId;
    const dbFriendAccounts = await accountDbService.getUserAccounts(friendUserId);

    const friendAccount = dbFriendAccounts.find(q => q.currency === currency);
    let friendAccountId = friendAccount && friendAccount.id;

    if (friendAccountId === undefined) {
        // If friend doesn't have account with that currency yet we create one for him.
        friendAccountId = await accountDbService.createUserAccount(friendUserId, currency);
    }

    await operationDbService.performTransfer(userAccountId, friendAccountId, amount, title, "operation");

    const response: ApiTransferFriendResponse = {};

    ctx.body = responseSuccess(response);
});

export default r;
