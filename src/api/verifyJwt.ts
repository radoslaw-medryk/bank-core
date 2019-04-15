import { Middleware } from "koa";
import { jwtconfig } from "@/configs/jwtconfig";

export const verifyJwt: Middleware = async (ctx, next) => {
    // TODO [RM]: verify JWT, set some field on ctx with JWT or smth
    await next();
};
