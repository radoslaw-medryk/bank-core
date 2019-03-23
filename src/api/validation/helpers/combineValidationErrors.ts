import { ValidationResult } from "../ValidationResult";
import { ValidationError } from "../errors/ValidationError";

export const combineValidationErrors = (...results: ValidationResult[]): ValidationError[] => {
    const errors = results.filter(q => q.error).map(q => q.error) as ValidationError[];
    return errors;
};
