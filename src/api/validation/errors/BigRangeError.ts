import { ValidationErrorBase } from "./ValidationError";
import Big from "big.js";

export const BigRangeErrorType = Symbol("BigRangeError");

export type BigRangeError = ValidationErrorBase & {
    type: typeof BigRangeErrorType;
    value: Big;
    minValue?: Big;
    maxValue?: Big;
};
