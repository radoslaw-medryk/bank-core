import Koa from "koa";
import Router from "koa-router";

const port = 5000;

export const koa = new Koa();
export const router = new Router();

export const startServer = () => {
    const x = require("@/routes");
    console.log(x);
    koa.use(router.routes());
    koa.use(router.allowedMethods());

    koa.listen(port, () => {
        console.log(`Server is listening on port ${port}.`);
    });
};
