import { pool } from "@/db";
import { AccountDbId } from "@/db/models/AccountDb";
import { sqlx } from "slonix";
import { transfer } from "../stored/transfer";
import { TransferDbId, TransferDb, transferFromRow } from "@/db/models/TransferDb";
import { toNumber } from "@/db/helpers/toNumber";
import { getTransfer } from "@/db/stored/getTransfer";
import Big from "big.js";
import { ForeignKeyIntegrityConstraintViolationError } from "slonik";
import { AccountDoesntExistsError } from "../exceptions/AccountDoesntExistError";

class TransferDbService {
    public transfer = async (fromId: AccountDbId, toId: AccountDbId, amount: Big): Promise<TransferDbId> => {
        if (fromId === toId) {
            // TODO [RM]: throw proper error
            throw new Error("fromId === toId");
        }

        try {
            const sql = transfer(fromId, toId, amount);
            const transferId = await sqlx.oneFirst(pool, sql);
            return toNumber(transferId);
        } catch (e) {
            if (e instanceof ForeignKeyIntegrityConstraintViolationError) {
                throw new AccountDoesntExistsError(undefined, e);
            }

            throw e;
        }
    };

    public getTransfer = async (transferId: TransferDbId): Promise<TransferDb> => {
        const sql = getTransfer(transferId);
        const row = await sqlx.one(pool, sql);
        return transferFromRow(row);
    };
}

export const transferDbService = new TransferDbService();
