import { ValidationErrorBase } from "./ValidationError";

export const NumberIntegerErrorType = Symbol("NumberIntegerError");

export type NumberIntegerError = ValidationErrorBase & {
    type: typeof NumberIntegerErrorType;
    value: number;
};
