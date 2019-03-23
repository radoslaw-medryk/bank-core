import { ValidationFunc } from "../ValidationFunc";
import { ValidationResult } from "../ValidationResult";
import { ValidationError } from "../errors/ValidationError";
import { ValidationMultiError, ValidationMultiErrorType } from "../errors/ValidationMultiError";
import { noError } from "../helpers/noError";

const validationMultiError = <T>(errors: ValidationError[]): ValidationResult => {
    const error: ValidationMultiError = {
        type: ValidationMultiErrorType,
        errors: errors,
    };

    return {
        error: error,
    };
};

export const chainValidators = <T>(value: T, validators: ValidationFunc<T>[], key?: string): ValidationResult => {
    const errors = validators
        .map(func => func(value))
        .map(q => q.error)
        .filter(q => q !== undefined) as ValidationError[];

    if (errors.length === 1) {
        return {
            error: errors[0],
        };
    }

    if (errors.length > 1) {
        return validationMultiError(errors);
    }

    return noError();
};
