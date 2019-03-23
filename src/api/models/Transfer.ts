import { AccountId } from "./Account";
import { TransferDb } from "@/db/models/TransferDb";
import Big from "big.js";

export type TransferId = number;

/**
 * @swagger
 *
 * definitions:
 *     Transfer:
 *         type: "object"
 *         properties:
 *             id:
 *                 type: "integer"
 *                 format: "int32"
 *             fromId:
 *                 type: "integer"
 *                 format: "int32"
 *             toId:
 *                 type: "integer"
 *                 format: "int32"
 *             amount:
 *                 type: "string"
 *                 format: "decimal"
 */
export type Transfer = {
    id: TransferId;
    fromId: AccountId;
    toId: AccountId;
    amount: Big;
};

// TODO [RM]: move somewhere else
export const transferFromDbModel = (transferDb: TransferDb): Transfer => ({
    id: transferDb.id,
    fromId: transferDb.fromId,
    toId: transferDb.toId,
    amount: transferDb.amount,
});
