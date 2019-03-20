import Decimal from "decimal.js";

export type AccountId = number;

/**
 * @swagger
 *
 * definitions:
 *     Account:
 *         type: "object"
 *         properties:
 *             id:
 *                 type: "integer"
 *                 format: "int32"
 *             balance:
 *                 type: "string"
 *                 format: "decimal"
 */
export type Account = {
    id: AccountId;
    balance: Decimal;
};
