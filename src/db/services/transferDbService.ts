import { pool } from "@/db";
import { AccountDbId } from "@/db/models/AccountDb";
import { sqlx } from "slonix";
import { transfer } from "../stored/transfer";
import { TransferDbId, TransferDb, transferFromRow } from "@/db/models/TransferDb";
import { toNumber } from "@/db/helpers/toNumber";
import { getTransfer } from "@/db/stored/getTransfer";
import Big from "big.js";
import { ForeignKeyIntegrityConstraintViolationError, NotFoundError } from "slonik";
import { getTransfers } from "../stored/getTransfers";
import { ResourceDoesntExistsError } from "../exceptions/ResourceDoesntExistError";

// TODO [RM]: wrap db exceptions into meaningful exceptions

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
                throw new ResourceDoesntExistsError("account", undefined, undefined, e);
            }

            throw e;
        }
    };

    public getTransfers = async (beforeId: TransferDbId | undefined, limit: number) => {
        const sql = getTransfers(beforeId, limit);
        const rows = await sqlx.any(pool, sql);
        return rows.map(transferFromRow);
    };

    public getTransfer = async (transferId: TransferDbId): Promise<TransferDb> => {
        try {
            const sql = getTransfer(transferId);
            const row = await sqlx.one(pool, sql);
            return transferFromRow(row);
        } catch (e) {
            if (e instanceof NotFoundError) {
                throw new ResourceDoesntExistsError("transfer", transferId, undefined, e);
            }
            throw e;
        }
    };
}

export const transferDbService = new TransferDbService();
