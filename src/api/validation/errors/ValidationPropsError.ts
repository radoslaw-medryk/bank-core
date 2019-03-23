import { ValidationErrorBase, ValidationError } from "./ValidationError";

export const ValidationPropsErrorType = Symbol("ValidationPropsError");

export type ValidationPropsError = ValidationErrorBase & {
    type: typeof ValidationPropsErrorType;
    errors: ValidationError[];
};
