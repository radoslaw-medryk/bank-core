import { table, column } from "declaro";
import { Account, AccountId } from "./Account";
import { User, UserId } from "./User";

export const UserAccounts = "UserAccounts";

@table(UserAccounts)
export class UserAccount {
    @column({ type: "integer", foreignKey: User })
    public userId: UserId = 0;

    @column({ type: "integer", foreignKey: Account })
    public accountId: AccountId = 0;
}
