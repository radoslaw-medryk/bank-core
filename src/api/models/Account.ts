import { AccountDb } from "@/db/models/AccountDb";
import { ValidationResult } from "../validation/ValidationResult";
import { ValidationError } from "../validation/errors/ValidationError";
import { missingValueError } from "../validation/errors/MissingValueError";
import { getPropsValueMissingKeys } from "../validation/checks/getPropsValueMissingKeys";
import Big from "big.js";
import { getPropsValueMissingErrors } from "../helpers/getPropsValueMissingErrors";

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
    balance: Big;
};

export const accountFromDbModel = (accountDb: AccountDb): Account => ({
    id: accountDb.id,
    balance: accountDb.balance,
});

export const validateAccount = (value: any): ValidationResult => {
    let errors: ValidationError[] = [];

    if (!value) {
        // TODO [RM]: what then?
        throw new Error("Not implemented");
    }

    const valueAsAccount = value as Account;

    const requiredProps: Array<keyof Account> = ["id", "balance"];
    errors = [...errors, ...getPropsValueMissingErrors(valueAsAccount, requiredProps)];

    // TODO [RM]: Add more checks
    throw new Error("Not implemented");

    return {
        errors: errors,
    };
};
