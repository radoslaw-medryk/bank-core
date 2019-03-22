import { ValidationErrorBase } from "./ValidationError";
import Big from "big.js";

type NumberType = number | Big;

export const OutOfRangeErrorType = Symbol("OutOfRangeError");

export type OutOfRangeError = ValidationErrorBase & {
    type: typeof OutOfRangeErrorType;
    value: NumberType;
    minValue: NumberType | undefined;
    maxValue: NumberType | undefined;
};

export const outOfRangeError = (
    field: string,
    value: NumberType,
    minValue: NumberType | undefined,
    maxValue: NumberType | undefined
): OutOfRangeError => ({
    type: OutOfRangeErrorType,
    field: field,
    value: value,
    minValue: minValue,
    maxValue: maxValue,
});
