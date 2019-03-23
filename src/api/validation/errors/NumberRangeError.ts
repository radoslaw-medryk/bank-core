import { ValidationErrorBase } from "./ValidationError";

export const NumberRangeErrorType = Symbol("NumberRangeError");

export type NumberRangeError = ValidationErrorBase & {
    type: typeof NumberRangeErrorType;
    value: number;
    minValue?: number;
    maxValue?: number;
};
