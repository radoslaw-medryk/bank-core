import koaJwt from "koa-jwt";
import { jwtconfig } from "@/configs/jwtconfig";

export const requireJwt = koaJwt({
    secret: jwtconfig.publicKey,
    algorithms: [jwtconfig.algorithm],
    key: "token",
});
