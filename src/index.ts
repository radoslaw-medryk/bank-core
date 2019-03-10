require("./registerAlias");
import { init } from "@/db/init";
import { startServer } from "@/server";

const main = async () => {
    await init();
    startServer();
};

(async () => await main())();
