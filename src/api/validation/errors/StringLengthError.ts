import { ValidationErrorBase } from "./ValidationError";

export const StringLengthErrorType = Symbol("StringLengthError");

export type StringLengthError = ValidationErrorBase & {
    type: typeof StringLengthErrorType;
    value: string;
    length: number;
    minLength: number | undefined;
    maxLength: number | undefined;
};

export const stringLengthError = (
    field: string,
    value: string,
    length: number,
    minLength: number | undefined,
    maxLength: number | undefined
): StringLengthError => ({
    type: StringLengthErrorType,
    field: field,
    value: value,
    length: length,
    minLength: minLength,
    maxLength: maxLength,
});
