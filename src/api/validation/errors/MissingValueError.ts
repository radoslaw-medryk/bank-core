import { ValidationErrorBase } from "./ValidationError";

export const MissingValueErrorType = Symbol("MissingValueError");

export type MissingValueError = ValidationErrorBase & {
    type: typeof MissingValueErrorType;
};

export const missingValueError = (field: string, value: any): MissingValueError => ({
    type: MissingValueErrorType,
    field: field,
    value: value,
});
