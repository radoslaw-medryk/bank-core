import { ValidationErrorBase } from "./ValidationError";

export const IncorrectValueErrorType = Symbol("IncorrectValueError");

export type IncorrectValueError = ValidationErrorBase & {
    type: typeof IncorrectValueErrorType;
};

export const incorrectValueError = (field: string, value: any): IncorrectValueError => ({
    type: IncorrectValueErrorType,
    field: field,
    value: value,
});
