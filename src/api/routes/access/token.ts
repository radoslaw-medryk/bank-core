import { check } from "../../helpers/check";
import { responseSuccess } from "../../helpers/responseSuccess";
import { Parsing } from "rusane";
import { validateStringLength } from "rusane/dist/validation";
import jwt from "jsonwebtoken";
import { jwtserverconfig } from "@/configs/jwtserverconfig";
import Router from "koa-router";
import { userDbService } from "@/db/services/userDbService";
import { ApiAccessTokenResponse } from "@radoslaw-medryk/bank-core-shared";
import ms from "ms";

const r = new Router({
    prefix: "/api/v1/access/token",
});

// TODO [RM]: swagger
r.post("/", async ctx => {
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

    const expiresInSec = Math.floor(ms(jwtserverconfig.expiresIn) / 1000);

    const profile = {
        email: email,
    };

    const response: ApiAccessTokenResponse = {
        token: token,
        expiresInSec: expiresInSec,
        profile: profile,
    };

    ctx.body = responseSuccess(response);
});

export default r;
