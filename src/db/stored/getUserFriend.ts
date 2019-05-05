import { sqlx } from "slonix";
import { storedFunction } from "@/db/helpers/storedFunction";
import { sql } from "slonik";
import { UserDbId } from "../models/UserDb";
import { FriendDb, FriendDbId } from "../models/FriendDb";

const FriendT = FriendDb.table;
const FriendP = FriendDb.props;

const name = sql.identifier(["getUserFriend"]);

export const createSql = storedFunction({
    name: name,
    language: "sql",
    params: ["_ownerUserId integer", "_friendId integer"],
    returns: sqlx`SETOF ${FriendT}`,
})`
    SELECT * FROM ${FriendT}
    WHERE ${FriendP.ownerUserId} = _ownerUserId
    AND ${FriendP.id} = _friendId
`;

export const getUserFriend = (ownerUserId: UserDbId, friendId: FriendDbId) => {
    return sqlx`SELECT * FROM ${name}(_ownerUserId => ${ownerUserId}, _friendId => ${friendId})`;
};
