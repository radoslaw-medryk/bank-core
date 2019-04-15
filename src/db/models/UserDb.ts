import { tableDefinition, propsDefinition, sqlx } from "slonix";
import { QueryResultRowType } from "slonik";
import { toNumber } from "@/db/helpers/toNumber";
import { toString } from "@/db/helpers/toString";
import { toDate } from "../helpers/toDate";

export type UserDbId = number;

export class UserDb {
    public id: UserDbId = 0;
    public email: string = "";
    public passwordHash: string = "";
    public created: Date = new Date(0);
    // TODO [RM]: handle more safety features, failed tries count, locking, etc.

    public static table = tableDefinition("Users");
    public static props = propsDefinition(UserDb);
}

const t = UserDb.table;
const p = UserDb.props;

export const createSql = sqlx`
    DROP TABLE IF EXISTS ${t} CASCADE;
    CREATE TABLE ${t} (
        ${p.id} serial PRIMARY KEY,
        ${p.email} varchar(1024) UNIQUE NOT NULL,
        ${p.passwordHash} varchar(1024) NOT NULL,
        ${p.created} timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
`;

export const userFromRow = (row: QueryResultRowType<keyof UserDb>): UserDb => {
    return {
        id: toNumber(row.id),
        email: toString(row.email),
        passwordHash: toString(row.passwordHash),
        created: toDate(row.created),
    };
};
