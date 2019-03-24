import Koa from "koa";
import Router from "koa-router";
import koaBody from "koa-body";
import { errorHandler } from "./errorHandler";

const port = 5000;

export const koa = new Koa();
export const router = new Router();

export const startServer = () => {
    require("./routes");
    koa.use(errorHandler);
    koa.use(koaBody());
    koa.use(router.routes());
    koa.use(router.allowedMethods());

    koa.listen(port, () => {
        console.log(`Server is listening on port ${port}.`);
    });
};
