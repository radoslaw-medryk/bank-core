import requireDir = require("require-dir");
import combineRouters from "koa-combine-routers";
import Router from "koa-router";
import { InternalError } from "@/InternalError";
import { flattenRequireDir } from "../helpers/flattenRequireDir";

const routers = flattenRequireDir(requireDir(".", { recurse: true }));

if (routers.some(q => !(q instanceof Router))) {
    throw new InternalError("Some of imported routers are not instance of koa's Router.");
}

const koaRouters = routers as Router[];

export const combinedRouter = combineRouters(koaRouters);
