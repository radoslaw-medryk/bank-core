import { AccountDbId, AccountDb } from "./AccountDb";
import { tableDefinition, propsDefinition, sqlx } from "slonix";
import { QueryResultRowType } from "slonik";
import { toNumber } from "@/db/helpers/toNumber";
import { UserDbId, UserDb } from "./UserDb";

export class UserAccountDb {
    public userId: UserDbId = 0;
    public accountId: AccountDbId = 0;

    public static table = tableDefinition("UserAccounts");
    public static props = propsDefinition(UserAccountDb);
}

const t = UserAccountDb.table;
const p = UserAccountDb.props;

export const createSql = sqlx`
    DROP TABLE IF EXISTS ${t} CASCADE;
    CREATE TABLE ${t} (
        ${p.userId} integer REFERENCES ${UserDb.table},
        ${p.accountId} integer REFERENCES ${AccountDb.table},

        CONSTRAINT UserAccounts_pkey PRIMARY KEY (${p.userId}, ${p.accountId})
    );
`;

export const userAccountFromRow = (row: QueryResultRowType<keyof UserAccountDb>): UserAccountDb => {
    return {
        userId: toNumber(row.userId),
        accountId: toNumber(row.accountId),
    };
};
