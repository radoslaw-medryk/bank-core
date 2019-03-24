import { Middleware } from "koa";
import { exceptionToApiErrors } from "./helpers/exceptionToApiErrors";
import { responseApiErrors } from "./helpers/responseApiErrors";

export const errorHandler: Middleware = async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        const apiErrors = exceptionToApiErrors(e);
        responseApiErrors(ctx, apiErrors);
    }
};
