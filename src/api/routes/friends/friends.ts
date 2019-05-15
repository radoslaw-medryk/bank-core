import { check } from "../../helpers/check";
import { validateNumberId } from "../../validation/validation/validateNumberId";
import { responseSuccess } from "../../helpers/responseSuccess";
import { Parsing } from "rusane";
import Router from "koa-router";
import { requireJwt } from "../../requireJwt";
import { friendDbService } from "@/db/services/friendDbService";
import { mapFriendFromDb } from "@/api/map/mapFriendFromDb";
import { validateEmail } from "rusane/dist/validation";
import { ApiAddFriendResponse } from "@radoslaw-medryk/bank-core-shared";
import { userDbService } from "@/db/services/userDbService";

const r = new Router({
    prefix: "/api/v1/friends",
});

// TODO [RM]: swagger
r.get("/", requireJwt, async ctx => {
    const userId = check(ctx.state.token, "sub", Parsing.parseNumber, validateNumberId);

    const dbFriends = await friendDbService.getUserFriends(userId);
    const friends = dbFriends.map(mapFriendFromDb);

    ctx.body = responseSuccess(friends);
});

// TODO [RM]: swagger
r.post("/", requireJwt, async ctx => {
    const userId = check(ctx.state.token, "sub", Parsing.parseNumber, validateNumberId);

    const email = check(ctx.request.body, "email", Parsing.parseString, validateEmail);
    const friendUser = await userDbService.getUserByEmail(email);

    const friendId = await friendDbService.makeFriend(userId, friendUser.id);

    const response: ApiAddFriendResponse = {};
    ctx.body = responseSuccess(response);
});

export default r;
