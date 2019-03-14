import { Account, AccountId } from "./Account";
import { User, UserId } from "./User";
import { propsDefinition, tableDefinition } from "slonix";
import { sql } from "slonik";

export class UserAccount {
    public userId: UserId = 0;
    public accountId: AccountId = 0;

    public static table = tableDefinition("UserAccounts");
    public static props = propsDefinition(UserAccount);
}

const t = UserAccount.table;
const p = UserAccount.props;

export const createSql = sql`
    DROP TABLE IF EXISTS ${t} CASCADE;    
    CREATE TABLE ${t} (
        ${p.userId} integer REFERENCES ${User.table},
        ${p.accountId} integer REFERENCES ${Account.table}
    );
`;
