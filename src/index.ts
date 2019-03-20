require("./registerAlias");
import { initDb } from "@/db/initDb";
import { startServer } from "@/api/server";
import Decimal from "decimal.js";
import { accountDbService } from "@/db/services/accountDbService";
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

    const t = await accountDbService.transfer(1, 2, new Decimal(20));
    console.log("transferId", t);
    const a1 = await accountDbService.getAccount(1);
    const a2 = await accountDbService.getAccount(2);
    console.log("a1", a1.toString(), "a2", a2.toString());
};

(async () => await main())();
