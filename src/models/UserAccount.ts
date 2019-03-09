import { table, column } from "declaro";
import { Account } from "./Account";
import { User } from "./User";

export const UserAccounts = "UserAccounts";

@table(UserAccounts)
export class UserAccount {
    @column({ type: "integer", foreignKey: User })
    public userId: number = 0;

    @column({ type: "integer", foreignKey: Account })
    public accountId: number = 0;
}
