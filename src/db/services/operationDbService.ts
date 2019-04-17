import { pool } from "@/db";
import { AccountDbId } from "@/db/models/AccountDb";
import { sqlx } from "slonix";
import { toNumber } from "@/db/helpers/toNumber";
import Big from "big.js";
import { ForeignKeyIntegrityConstraintViolationError, NotFoundError } from "slonik";
import { ResourceDoesntExistsError } from "../exceptions/ResourceDoesntExistError";
import { performTransferOperation } from "../stored/performTransferOperation";
import { OperationDbId, operationFromRow } from "../models/OperationDb";
import { getOperations } from "../stored/getOperations";

// TODO [RM]: wrap db exceptions into meaningful exceptions

class OperationDbService {
    public performTransfer = async (
        fromId: AccountDbId,
        toId: AccountDbId,
        amount: Big,
        title: string | undefined,
        category: string | undefined
    ): Promise<[OperationDbId, OperationDbId]> => {
        if (fromId === toId) {
            // TODO [RM]: throw proper error
            throw new Error("fromId === toId");
        }

        try {
            const sql = performTransferOperation(fromId, toId, amount, title, category);
            const { _fromOperationId, _toOperationId } = await sqlx.one(pool, sql);

            return [toNumber(_fromOperationId), toNumber(_toOperationId)];
        } catch (e) {
            if (e instanceof ForeignKeyIntegrityConstraintViolationError) {
                throw new ResourceDoesntExistsError("account", undefined, undefined, e);
            }

            throw e;
        }
    };

    public getOperations = async (accountId: AccountDbId, beforeId: OperationDbId | undefined, limit: number) => {
        const sql = getOperations(accountId, beforeId, limit);
        const rows = await sqlx.any(pool, sql);
        return rows.map(operationFromRow);
    };
}

export const operationDbService = new OperationDbService();
