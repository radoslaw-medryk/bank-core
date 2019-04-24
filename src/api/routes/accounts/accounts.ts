import { check } from "../../helpers/check";
import { validateNumberId } from "../../validation/validation/validateNumberId";
import { responseSuccess } from "../../helpers/responseSuccess";
import { Parsing } from "rusane";
import Router from "koa-router";
import { requireJwt } from "../../requireJwt";
import { accountDbService } from "@/db/services/accountDbService";
import { mapAccountFromDb } from "../../map/mapAccountFromDb";

const r = new Router({
    prefix: "/api/v1/accounts",
});

// TODO [RM]: swagger
r.get("/", requireJwt, async ctx => {
    const userId = check(ctx.state.token, "sub", Parsing.parseNumber, validateNumberId);

    const dbAccounts = await accountDbService.getUserAccounts(userId);
    const accounts = dbAccounts.map(mapAccountFromDb);

    ctx.body = responseSuccess(accounts);
});

export default r;
