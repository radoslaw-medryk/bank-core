import requireDir from "require-dir";
import { seedTestData } from "./seedTestData";
import { seedInitData } from "./seedInitData";
import { pool } from ".";
import { sqlx } from "slonix";

// TODO [RM]: Recreated fresh SQL database with fresh data on each call;
// TODO [RM]: for DEV purposes only. For production needed different behavior.

export const initDb = async () => {
    const models = requireDir("./models", { recurse: true });
    const stored = requireDir("./stored", { recurse: true });
    const dirs = [models, stored];

    await pool.transaction(async t => {
        for (const dir of dirs) {
            for (const path in dir) {
                const values = dir[path];
                if (values.createSql) {
                    await sqlx.query(t, values.createSql);
                }
            }
        }
    });

    await seedInitData();
    await seedTestData();
};
