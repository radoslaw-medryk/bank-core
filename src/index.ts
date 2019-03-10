require("./registerAlias");
import { initDb } from "@/db/initDb";
import { startServer } from "@/server";
import { accountService } from "./logic/accountService";
import Decimal from "decimal.js";

const main = async () => {
    await initDb();
    startServer();

    await accountService.transfer(1, 2, new Decimal(10));
};

(async () => await main())();
