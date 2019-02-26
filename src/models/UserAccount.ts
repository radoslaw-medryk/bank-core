import { table } from "@/orm/table";
import { row } from "@/orm/row";
import { Users } from "./User";
import { Accounts } from "./Account";

export const UserAccounts = "UserAccounts";

@table(UserAccounts)
export class UserAccount {
    @row("integer NOT NULL")
    public userId?: number = undefined;

    @row("integer NOT NULL")
    public accountId?: number = undefined;

    public static sql = `
        CONSTRAINT userId_FK FOREIGN KEY (userId) REFERENCES ${Users}
        CONSTRAINT accountId_FK FOREIGN KEY (accountId) REFERENCES ${Accounts}
    `;
}
