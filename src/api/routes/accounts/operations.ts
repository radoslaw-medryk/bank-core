import { check } from "../../helpers/check";
import { validateNumberId } from "../../validation/validation/validateNumberId";
import { validatePageLimit } from "../../validation/validation/validatePageLimit";
import { defaultPageLimit } from "../../helpers/defaultPageLimit";
import { responseSuccess } from "../../helpers/responseSuccess";
import { Parsing } from "rusane";
import Router from "koa-router";
import { requireJwt } from "../../requireJwt";
import { operationDbService } from "@/db/services/operationDbService";
import { accountDbService } from "@/db/services/accountDbService";
import { InternalError } from "@/InternalError";
import { mapOperationFromDb } from "../../map/mapOperationFromDb";

const r = new Router({
    prefix: "/api/v1/accounts/:accountId/operations",
});

// TODO [RM]: swagger
r.get("/", requireJwt, async ctx => {
    const userId = check(ctx.state.token, "sub", Parsing.parseNumber, validateNumberId);

    const accountId = check(ctx.params, "accountId", Parsing.parseNumber, validateNumberId);
    const beforeId = check(ctx.query, "beforeId", Parsing.parseOptionalNumber, validateNumberId);
    let limit = check(ctx.query, "limit", Parsing.parseOptionalNumber, validatePageLimit);

    if (limit === undefined) {
        limit = defaultPageLimit;
    }

    const account = await accountDbService.getUserAccount(userId, accountId);

    const dbOperations = await operationDbService.getOperations(accountId, beforeId, limit);
    const transactions = dbOperations.map(q => mapOperationFromDb(q, account.currency));

    ctx.body = responseSuccess(transactions);
});

export default r;
