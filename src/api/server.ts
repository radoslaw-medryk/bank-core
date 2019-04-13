import Koa from "koa";
import Router from "koa-router";
import koaBody from "koa-body";
import koaCors from "@koa/cors";
import { errorHandler } from "./errorHandler";
import { appconfig } from "@/configs/appconfig";

const { port } = appconfig;

export const koa = new Koa();
export const router = new Router();

export const startServer = () => {
    require("./routes");
    koa.use(koaCors());
    koa.use(errorHandler);
    koa.use(koaBody());
    koa.use(router.routes());
    koa.use(router.allowedMethods());

    koa.listen(port, () => {
        console.log(`Server is listening on port ${port}.`);
    });
};
