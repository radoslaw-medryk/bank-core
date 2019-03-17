import requireDir from "require-dir";
import { seedTestData } from "./seedTestData";
import { seedInitData } from "./seedInitData";
import { pool } from ".";
import { sqlx } from "slonix";

// TODO [RM]: Recreated fresh SQL database with fresh data on each call;
// TODO [RM]: for DEV purposes only. For production needed different behavior.

export const initDb = async () => {
    const models = requireDir("../models", { recurse: true });
    await pool.transaction(async t => {
        for (const path in models) {
            const model = models[path];
            if (model.createSql) {
                await sqlx.query(t, model.createSql);
            }
        }
    });

    await seedInitData();
    await seedTestData();
};
