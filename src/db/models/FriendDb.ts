import { tableDefinition, propsDefinition, sqlx } from "slonix";
import { QueryResultRowType } from "slonik";
import { toNumber } from "@/db/helpers/toNumber";
import { toDate } from "../helpers/toDate";
import { UserDbId, UserDb } from "./UserDb";

export type FriendDbId = number;

export class FriendDb {
    public id: FriendDbId = 0;
    public ownerUserId: UserDbId = 0;
    public friendUserId: UserDbId = 0;
    public date: Date = new Date(0);

    public static table = tableDefinition("Friends");
    public static props = propsDefinition(FriendDb);
}

const t = FriendDb.table;
const p = FriendDb.props;

export const createSql = sqlx`
    DROP TABLE IF EXISTS ${t} CASCADE;
    CREATE TABLE ${t} (
        ${p.id} serial PRIMARY KEY,
        ${p.ownerUserId} integer REFERENCES ${UserDb.table} NOT NULL,
        ${p.friendUserId} integer REFERENCES ${UserDb.table} NOT NULL,
        ${p.date} timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CHECK(${p.ownerUserId} != ${p.friendUserId}),
        UNIQUE(${p.ownerUserId}, ${p.friendUserId})
    );
`;

export const friendFromRow = (row: QueryResultRowType<keyof FriendDb>): FriendDb => {
    return {
        id: toNumber(row.id),
        ownerUserId: toNumber(row.ownerUserId),
        friendUserId: toNumber(row.friendUserId),
        date: toDate(row.date),
    };
};
