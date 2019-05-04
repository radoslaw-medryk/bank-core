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
    params: ["_ownerId integer", "_targetId integer", "OUT _friendId integer"],
})`
    BEGIN
        INSERT INTO ${FriendT} (${FriendP.ownerId}, ${FriendP.friendId})
        VALUES (_ownerId, _targetId)
        RETURNING ${FriendP.id} INTO _friendId;
    END;
`;

export const makeFriend = (ownerId: UserDbId, targetId: UserDbId): SqlxQuery => {
    return sqlx`SELECT * FROM ${name}(_ownerId => ${ownerId}, _targetId => ${targetId});`;
};
