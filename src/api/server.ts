import Koa from "koa";
import Router from "koa-router";
import koaBody from "koa-body";

const port = 5000;

export const koa = new Koa();
export const router = new Router();

export const startServer = () => {
    require("./routes");
    koa.use(router.routes());
    koa.use(koaBody());
    koa.use(router.allowedMethods());

    koa.listen(port, () => {
        console.log(`Server is listening on port ${port}.`);
    });
};
