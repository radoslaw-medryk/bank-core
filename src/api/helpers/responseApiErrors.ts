import { ApiErrorResponse } from "../models/ApiResponse";
import { ApiError } from "../models/errors/ApiError";
import { ParameterizedContext } from "koa";

export const responseApiErrors = (ctx: ParameterizedContext, errors: ApiError[]) => {
    const response: ApiErrorResponse = {
        errors: errors,
    };

    ctx.status = 400;
    ctx.body = response;
};
