import requireDir from "require-dir";
import { Declaro, sqlForTables } from "declaro";
import { db } from "./db";
import { Users, User } from "./models/User";
import { Account, Accounts } from "./models/Account";
import { UserAccount, UserAccounts } from "./models/UserAccount";

const declaro = Declaro.instance;

export const initDb = async () => {
    requireDir("./models", { recurse: true });
    const declarations = declaro.getDeclarations();
    const sql = sqlForTables(declarations, { dropCascade: true });
    await db.schema.raw(sql);

    await seedInitData();
    await seedTestData();
};

const seedInitData = async () => {
    //
};

const seedTestData = async () => {
    const users: User[] = [{ name: "Radoslaw Materialowiec" }, { name: "Zoey Zou" }];
    const userIds = await db(Users)
        .insert(users)
        .returning("id");

    const accounts: Account[] = [{ balance: 0 }, { balance: 0 }];
    const accountIds = await db(Accounts)
        .insert(accounts)
        .returning("id");

    const userAccounts: UserAccount[] = [
        { userId: userIds[0], accountId: accountIds[0] },
        { userId: userIds[1], accountId: accountIds[1] },
    ];
    await db(UserAccounts).insert(userAccounts);
};
