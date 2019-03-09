require("./registerAlias");
import { initDb } from "./initDb";

const main = async () => {
    await initDb();

    console.log("END");
    process.exit();
};

(async () => await main())();
