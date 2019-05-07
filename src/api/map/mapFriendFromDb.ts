import { ApiFriend } from "@radoslaw-medryk/bank-core-shared";
import { FriendDb } from "@/db/models/FriendDb";

// TODO [RM]: contains dummy/test data partially for now

const mockNames = ["John Short", "Anna Kurnik", "Suzan Miller", "Harvey Specter", "Mike Ross", "Rachel Boss"];
const mockGenders: ("m" | "f")[] = ["m", "f", "f", "m", "m", "f"];

export const mapFriendFromDb = (dbFriend: FriendDb): ApiFriend => {
    return {
        id: dbFriend.id,
        name: mockNames[dbFriend.id % mockNames.length],
        gender: mockGenders[dbFriend.id % mockGenders.length],
    };
};
