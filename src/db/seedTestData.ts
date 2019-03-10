import { User, Users } from "@/models/User";
import { db } from ".";
import { Account, Accounts } from "@/models/Account";
import { UserAccount, UserAccounts } from "@/models/UserAccount";

export const seedTestData = async () => {
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
