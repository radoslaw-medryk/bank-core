import { tableDefinition, propsDefinition, sqlx } from "slonix";
import { QueryResultRowType } from "slonik";
import { toNumber } from "@/db/helpers/toNumber";
import { toDate } from "../helpers/toDate";
import { UserDbId, UserDb } from "./UserDb";

export type FriendDbId = number;

export class FriendDb {
    public id: FriendDbId = 0;
    public ownerId: UserDbId = 0;
    public friendId: UserDbId = 0;
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
        ${p.ownerId} integer REFERENCES ${UserDb.table} NOT NULL,
        ${p.friendId} integer REFERENCES ${UserDb.table} NOT NULL,
        ${p.date} timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CHECK(${p.ownerId} != ${p.friendId}),
        UNIQUE(${p.ownerId}, ${p.friendId})
    );
`;

export const friendFromRow = (row: QueryResultRowType<keyof FriendDb>): FriendDb => {
    return {
        id: toNumber(row.id),
        ownerId: toNumber(row.ownerId),
        friendId: toNumber(row.friendId),
        date: toDate(row.date),
    };
};
