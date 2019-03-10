import requireDir from "require-dir";
import { Declaro, sqlForTables } from "declaro";
import { db } from ".";
import { seedTestData } from "./seedTestData";

// TODO [RM]: Recreated fresh SQL database with fresh data on each call;
// TODO [RM]: for DEV purposes only. For production needed different behavior.

const declaro = Declaro.instance;

export const init = async () => {
    requireDir("./models", { recurse: true });
    const declarations = declaro.getDeclarations();
    const sql = sqlForTables(declarations, { dropCascade: true });
    await db.schema.raw(sql);

    await seedInitData();
    await seedTestData();
};
