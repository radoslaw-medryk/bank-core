import { AccountId } from "./Account";
import Decimal from "decimal.js";

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
    amount: Decimal;
};
