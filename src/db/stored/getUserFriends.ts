import { sqlx } from "slonix";
import { storedFunction } from "@/db/helpers/storedFunction";
import { sql } from "slonik";
import { UserDbId } from "../models/UserDb";
import { FriendDb } from "../models/FriendDb";

const FriendT = FriendDb.table;
const FriendP = FriendDb.props;

const name = sql.identifier(["getUserFriends"]);

export const createSql = storedFunction({
    name: name,
    language: "sql",
    params: ["_userId integer"],
    returns: sqlx`SETOF ${FriendT}`,
})`
    SELECT * FROM ${FriendT}
    WHERE ${FriendP.ownerId} = _userId
`;

export const getUserFriends = (userId: UserDbId) => {
    return sqlx`SELECT * FROM ${name}(_userId => ${userId})`;
};
