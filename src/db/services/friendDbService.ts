import { pool } from "@/db";
import { sqlx } from "slonix";
import { toNumber } from "@/db/helpers/toNumber";
import { UserDbId } from "../models/UserDb";
import { FriendDbId, FriendDb, friendFromRow } from "../models/FriendDb";
import { makeFriend } from "../stored/makeFriend";
import { getUserFriends } from "../stored/getUserFriends";

// TODO [RM]: wrap db exceptions into meaningful exceptions

class FriendDbService {
    public makeFriend = async (userId: UserDbId, targetId: UserDbId): Promise<FriendDbId> => {
        const sql = makeFriend(userId, targetId);
        const friendId = await sqlx.oneFirst(pool, sql);
        return toNumber(friendId);
    };

    public getUserFriends = async (userId: UserDbId): Promise<FriendDb[]> => {
        const sql = getUserFriends(userId);
        const rows = await sqlx.any(pool, sql);
        return rows.map(friendFromRow);
    };
}

export const friendDbService = new FriendDbService();
