require("./registerAlias");
import { initDb } from "@/db/initDb";
import { startServer } from "@/api/server";
import { accountDbService } from "@/db/services/accountDbService";
import { transferDbService } from "@/db/services/transferDbService";
import { Big } from "big.js";

const main = async () => {
    await initDb();
    startServer();

    const t = await transferDbService.transfer(1, 2, new Big(20));
    console.log("transferId", t);
    const a1 = await accountDbService.getAccount(1);
    const a2 = await accountDbService.getAccount(2);
    console.log("a1", a1, "a2", a2);
};

(async () => await main())();
