import { ValidationError } from "../errors/ValidationError";
import { ValidationPropsError, ValidationPropsErrorType } from "../errors/ValidationPropsError";
import { ValidationResult } from "../ValidationResult";

export const failedValidateProps = (errors: ValidationError[], key?: string): ValidationResult => {
    const error: ValidationPropsError = {
        type: ValidationPropsErrorType,
        key: key,
        errors: errors,
    };

    return {
        error: error,
    };
};
