import { pool } from "@/db";
import { sqlx } from "slonix";
import { toNumber } from "@/db/helpers/toNumber";
import { UserDbId } from "../models/UserDb";
import { FriendDbId, FriendDb, friendFromRow } from "../models/FriendDb";
import { makeFriend } from "../stored/makeFriend";
import { getUserFriends } from "../stored/getUserFriends";
import { getUserFriend } from "../stored/getUserFriend";

// TODO [RM]: wrap db exceptions into meaningful exceptions

class FriendDbService {
    public makeFriend = async (userId: UserDbId, targetUserId: UserDbId): Promise<FriendDbId> => {
        const sql = makeFriend(userId, targetUserId);
        const friendId = await sqlx.oneFirst(pool, sql);
        return toNumber(friendId);
    };

    public getUserFriends = async (userId: UserDbId): Promise<FriendDb[]> => {
        const sql = getUserFriends(userId);
        const rows = await sqlx.any(pool, sql);
        return rows.map(friendFromRow);
    };

    public getUserFriend = async (userId: UserDbId, friendId: FriendDbId): Promise<FriendDb> => {
        const sql = getUserFriend(userId, friendId);
        const row = await sqlx.one(pool, sql);
        return friendFromRow(row);
    };
}

export const friendDbService = new FriendDbService();
