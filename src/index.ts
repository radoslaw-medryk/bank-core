require("./registerAlias");
import { initDb } from "@/db/initDb";
import { startServer } from "@/server";
import Decimal from "decimal.js";
import { accountDbService } from "./dbServices/accountDbService";
import { sqlx } from "slonix";

sqlx.registerProcessor({
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

    await accountDbService.transfer(1, 2, new Decimal(20));
};

(async () => await main())();
