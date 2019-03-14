require("./registerAlias");
import { initDb } from "@/db/initDb";
import { startServer } from "@/server";
import Decimal from "decimal.js";
import { Sqlx } from "slonix";
import { accountDbService } from "./dbServices/accountDbService";

Sqlx.registerProcessor({
    predicate: value => value instanceof Decimal,
    process: value => ({
        value: value.toString(),
        escapeString: false,
        wrapString: false,
    }),
});

const main = async () => {
    await initDb();
    startServer();

    const a = await accountDbService.createAccount();
    const b = await accountDbService.createAccount();

    await accountDbService.transfer(a, b, new Decimal(10));
};

(async () => await main())();
