import { ValidationErrorBase } from "./ValidationError";

export const StringLengthErrorType = Symbol("StringLengthError");

export type StringLengthError = ValidationErrorBase & {
    type: typeof StringLengthErrorType;
    length: number;
    minLength?: number;
    maxLength?: number;
};
