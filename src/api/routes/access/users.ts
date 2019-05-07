import { check } from "../../helpers/check";
import { responseSuccess } from "../../helpers/responseSuccess";
import { Parsing } from "rusane";
import { validateStringLength, validateEmail } from "rusane/dist/validation";
import Router from "koa-router";
import { userDbService } from "@/db/services/userDbService";
import { ApiRegisterUserResponse } from "@radoslaw-medryk/bank-core-shared";
import { initNewUserDummyData } from "@/api/helpers/initNewUserDummyData";

const r = new Router({
    prefix: "/api/v1/access/users",
});

// TODO [RM]: swagger
r.post("/", async ctx => {
    const email = check(
        ctx.request.body,
        "email",
        Parsing.parseString,
        validateStringLength({ minLength: 1, maxLength: 256 }),
        validateEmail
    );
    const password = check(
        ctx.request.body,
        "password",
        Parsing.parseString,
        validateStringLength({ minLength: 8, maxLength: 256 })
        // TODO [RM]: validate password strength, etc.
    );

    const userId = await userDbService.createUser(email, password);

    await initNewUserDummyData(userId); // TODO [RM]: TEMP, TEST only

    const response: ApiRegisterUserResponse = {
        userId: userId,
    };

    ctx.body = responseSuccess(response);
});

export default r;
