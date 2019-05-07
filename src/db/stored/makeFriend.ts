import { sqlx, SqlxQuery } from "slonix";
import { storedFunction } from "../helpers/storedFunction";
import { sql } from "slonik";
import { UserDbId, UserDb } from "../models/UserDb";
import { FriendDb } from "../models/FriendDb";

const FriendT = FriendDb.table;
const FriendP = FriendDb.props;

const UserT = UserDb.table;
const UserP = UserDb.props;

const name = sql.identifier(["makeFriend"]);

export const createSql = storedFunction({
    name: name,
    language: "plpgsql",
    params: ["_ownerUserId integer", "_targetUserId integer", "OUT _friendId integer"],
})`
    BEGIN
        INSERT INTO ${FriendT} (${FriendP.ownerUserId}, ${FriendP.friendUserId})
        VALUES (_ownerUserId, _targetUserId)
        RETURNING ${FriendP.id} INTO _friendId;
    END;
`;

export const makeFriend = (ownerUserId: UserDbId, targetUserId: UserDbId): SqlxQuery => {
    return sqlx`SELECT * FROM ${name}(_ownerUserId => ${ownerUserId}, _targetUserId => ${targetUserId});`;
};
