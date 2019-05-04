import { ApiFriend } from "@radoslaw-medryk/bank-core-shared";
import { FriendDb } from "@/db/models/FriendDb";

// TODO [RM]: contains dummy/test data partially for now

export const mapFriendFromDb = (dbFriend: FriendDb): ApiFriend => {
    return {
        id: dbFriend.id,
        name: "Temp Test", // TODO [RM]: dummy name for now
        gender: "f",
    };
};
