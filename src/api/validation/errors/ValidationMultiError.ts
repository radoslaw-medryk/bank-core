import { ValidationErrorBase, ValidationError } from "./ValidationError";

export const ValidationMultiErrorType = Symbol("ValidationMultiError");

export type ValidationMultiError = ValidationErrorBase & {
    type: typeof ValidationMultiErrorType;
    errors: ValidationError[];
};
