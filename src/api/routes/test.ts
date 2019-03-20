import { router } from "@/api/server";

const r = router.prefix("/api/v1/test");

// TODO [RM]: validation

/**
 * @swagger
 *
 * /api/v1/test:
 *   get:
 *     description: Get test greeting message.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
r.get("/", ctx => {
    ctx.body = "Hello and welocome to root route!";
});

r.get("/smth/:id", ctx => {
    ctx.body = {
        request: "smth",
        id: ctx.params.id,
    };
});
