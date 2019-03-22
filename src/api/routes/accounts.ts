import { router } from "@/api/server";
import { accountDbService } from "@/db/services/accountDbService";
import { accountFromDbModel } from "../models/Account";

const r = router.prefix("/api/v1/accounts");

// TODO [RM]: validation / sanitization
// TODO [RM]: Common response envelope, error codes, etc.

/**
 * @swagger
 *
 * /api/v1/accounts/{id}:
 *   get:
 *     description: Gets account with given id.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID of an account.
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Account
 *         schema:
 *             $ref: '#/definitions/Account'
 *       400:
 *         description: 'Error; // TODO [RM]: more details'
 */
r.get("/:id", async ctx => {
    const accountId = Number(ctx.params.id); // TODO [RM]: validation/sanitization

    const accountDb = await accountDbService.getAccount(accountId);

    ctx.body = accountFromDbModel(accountDb);
});

/**
 * @swagger
 *
 * /api/v1/accounts:
 *   post:
 *     description: Creates new account. Returns account ID.
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: 'Account created successfuly. // TODO [RM]: correct response schema'
 *         schema:
 *             description: Account ID.
 *             type: integer
 *       400:
 *         description: 'Error; // TODO [RM]: more details'
 */
r.post("/", async ctx => {
    // TODO [RM]: CreateAccountRequest

    const accountId = await accountDbService.createAccount();

    ctx.body = accountId;
});
