import { check } from "../helpers/check";
import { validateNumberId } from "../validation/validation/validateNumberId";
import { validatePageLimit } from "../validation/validation/validatePageLimit";
import { transferDbService } from "@/db/services/transferDbService";
import { defaultPageLimit } from "../helpers/defaultPageLimit";
import { mapTransactionFromDb } from "../map/mapTransactionFromDb";
import { responseSuccess } from "../helpers/responseSuccess";
import { Parsing } from "rusane";
import Router from "koa-router";
import { requireJwt } from "../requireJwt";

const r = new Router({
    prefix: "/api/v1/transactions",
});

/**
 * @swagger
 *
 *  /api/v1/transactions:
 *      get:
 *          description: Gets transactions.
 *          produces:
 *              - application/json
 *          parameters:
 *              - $ref: '#/parameters/beforeId'
 *              - $ref: '#/parameters/limit'
 *          responses:
 *              200:
 *                  type: object
 *                  properties:
 *                      data:
 *                          type: array
 *                          items:
 *                              $ref: '#/definitions/ApiTransaction'
 *              400:
 *                  $ref: '#/definitions/ApiError'
 */
r.get("/", requireJwt, async ctx => {
    const beforeId = check(ctx.query, "beforeId", Parsing.parseOptionalNumber, validateNumberId);
    let limit = check(ctx.query, "limit", Parsing.parseOptionalNumber, validatePageLimit);

    if (limit === undefined) {
        limit = defaultPageLimit;
    }

    const dbTransfers = await transferDbService.getTransfers(beforeId, limit);
    const transactions = dbTransfers.map(mapTransactionFromDb);

    ctx.body = responseSuccess(transactions);
});

/**
 * @swagger
 *
 * /api/v1/transactions/{id}:
 *   get:
 *     description: Gets transaction with given id.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID of a transaction.
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Transaction
 *         schema:
 *             $ref: '#/definitions/ApiTransaction'
 *       400:
 *         $ref: '#/definitions/ApiError'
 */
r.get("/:id", requireJwt, async ctx => {
    const id = check(ctx.params, "id", Parsing.parseNumber, validateNumberId);

    const dbTransfer = await transferDbService.getTransfer(id);
    const transaction = mapTransactionFromDb(dbTransfer);

    ctx.body = responseSuccess(transaction);
});

r.post("/", async ctx => {
    console.log("POST to /api/v1/transactions");
});

export default r;
