require("./registerAlias");
import { initDb } from "@/db/initDb";
import { startServer } from "@/api/server";

const main = async () => {
    await initDb();
    startServer();
};

(async () => await main())();
