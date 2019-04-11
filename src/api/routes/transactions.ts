import { router } from "@/api/server";
import { check } from "../helpers/check";
import { parseNumber, parseOptionalNumber } from "rusane/dist/parsing";
import { validateNumberId } from "../validation/validation/validateNumberId";
import { validatePageLimit } from "../validation/validation/validatePageLimit";

const r = router.prefix("/api/v1/transactions");

// TODO [RM]: validation / sanitization
// TODO [RM]: Common response envelope, error codes, etc.

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
 *                  description: 'Error; // TODO [RM]: more details'
 */
r.get("/", async ctx => {
    const beforeId = check(ctx.query, "beforeId", parseOptionalNumber, validateNumberId);
    const limit = check(ctx.query, "limit", parseOptionalNumber, validatePageLimit);

    throw new Error("Not implemented");
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
 *         description: 'Error; // TODO [RM]: more details'
 */
r.get("/:id", async ctx => {
    const id = check(ctx.params, "id", parseNumber, validateNumberId);

    throw new Error("Not implemented");
});

// r.get("/:id", async ctx => {
//     const transferId = Number(ctx.params.id); // TODO [RM]: validation/sanitization

//     const transferDb = await transferDbService.getTransfer(transferId);

//     ctx.body = mapTransactionFromDb(transferDb);
// });

// r.post("/", async ctx => {
//     const parsedAndValidated = checkPerformTransferRequest(ctx.request.body);
//     if (parsedAndValidated.errors) {
//         responseApiErrors(ctx, parsedAndValidated.errors);
//         return;
//     }

//     const request = parsedAndValidated.value;
//     const { fromId, toId, amount } = request;

//     const transferId = await transferDbService.transfer(fromId, toId, amount);
//     // TODO [RM]: handle business logic errors - e.g. transfer failed as well

//     ctx.body = transferId;
// });
