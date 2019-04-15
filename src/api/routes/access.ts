import { check } from "../helpers/check";
import { responseSuccess } from "../helpers/responseSuccess";
import { Parsing } from "rusane";
import { validateStringLength } from "rusane/dist/validation";
import jwt from "jsonwebtoken";
import { jwtserverconfig } from "@/configs/jwtserverconfig";
import Router from "koa-router";
import { userDbService } from "@/db/services/userDbService";

const r = new Router({
    prefix: "/api/v1/access",
});

// TODO [RM]: swagger
r.post("/token", async ctx => {
    // TODO [RM]: rate limiting, captcha, smth?

    const email = check(
        ctx.request.body,
        "email",
        Parsing.parseString,
        validateStringLength({ minLength: 1, maxLength: 256 })
    );
    const password = check(
        ctx.request.body,
        "password",
        Parsing.parseString,
        validateStringLength({ minLength: 1, maxLength: 256 })
    );

    const userDb = await userDbService.getUserByEmailAndPassword(email, password);

    // TODO [RM]: audit logs

    const token = jwt.sign({}, jwtserverconfig.privateKey, {
        algorithm: "RS256",
        expiresIn: jwtserverconfig.expiresIn,
        subject: userDb.id.toString(),
    });

    ctx.body = responseSuccess({
        token: token,
    });
});

// TODO [RM]: swagger
r.post("/users", async ctx => {
    const email = check(
        ctx.request.body,
        "email",
        Parsing.parseString,
        validateStringLength({ minLength: 1, maxLength: 256 })
    );
    const password = check(
        ctx.request.body,
        "password",
        Parsing.parseString,
        validateStringLength({ minLength: 8, maxLength: 256 })
        // TODO [RM]: validate password strength, etc.
    );

    const userId = await userDbService.createUser(email, password);

    ctx.body = responseSuccess({
        userId: userId,
    });
});

export default r;
