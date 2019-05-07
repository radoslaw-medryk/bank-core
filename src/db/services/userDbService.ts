import { pool } from "@/db";
import { sqlx } from "slonix";
import { toNumber } from "@/db/helpers/toNumber";
import { UserDbId, UserDb, userFromRow } from "../models/UserDb";
import { createUser } from "../stored/createUser";
import { getUser } from "../stored/getUser";
import { getUserByEmail } from "../stored/getUserByEmail";
import bcrypt from "bcryptjs";
import { ResourceDoesntExistsError } from "../exceptions/ResourceDoesntExistError";
import { NotFoundError, UniqueIntegrityConstraintViolationError } from "slonik";
import { ResourceAlreadyExistsError } from "../exceptions/ResourceAlreadyExistsError";

class UserDbService {
    public createUser = async (email: string, password: string): Promise<UserDbId> => {
        try {
            const passwordHash = await this.hashPassword(password);

            const sql = createUser(email, passwordHash);
            const userId = await sqlx.oneFirst(pool, sql);

            return toNumber(userId);
        } catch (e) {
            if (e instanceof UniqueIntegrityConstraintViolationError) {
                throw new ResourceAlreadyExistsError("user");
            }
            throw e;
        }
    };

    public getUser = async (userId: UserDbId): Promise<UserDb> => {
        try {
            const sql = getUser(userId);
            const row = await sqlx.one(pool, sql);
            return userFromRow(row);
        } catch (e) {
            if (e instanceof NotFoundError) {
                throw new ResourceDoesntExistsError("user", userId, undefined, e);
            }
            throw e;
        }
    };

    public getUserByEmailAndPassword = async (email: string, password: string): Promise<UserDb> => {
        const sql = getUserByEmail(email);
        const row = await sqlx.maybeOne(pool, sql);
        if (row === null) {
            throw new ResourceDoesntExistsError("user");
        }

        const userDb = userFromRow(row);

        if (!(await this.verifyPassword(userDb.passwordHash, password))) {
            throw new ResourceDoesntExistsError("user");
        }

        return userDb;
    };

    private hashPassword = async (password: string): Promise<string> => {
        return await bcrypt.hash(password, 10);
    };

    private verifyPassword = async (hash: string, password: string): Promise<boolean> => {
        return await bcrypt.compare(password, hash);
    };
}

export const userDbService = new UserDbService();
