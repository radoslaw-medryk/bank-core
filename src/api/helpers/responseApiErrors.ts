import { ParameterizedContext } from "koa";
import { ApiError, ApiErrorResponse } from "@radoslaw-medryk/bank-core-shared";

export const responseApiErrors = (ctx: ParameterizedContext, errors: ApiError[]) => {
    const response: ApiErrorResponse = {
        errors: errors,
    };

    ctx.status = 400;
    ctx.body = response;
};
