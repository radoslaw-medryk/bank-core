import { ValidationResult } from "../ValidationResult";
import { StringLengthError, StringLengthErrorType } from "../errors/StringLengthError";
import { noError } from "../helpers/noError";

type ValidateStringLengthRule = {
    minLength?: number;
    maxLength?: number;
};

const stringLengthError = (length: number, rule: ValidateStringLengthRule): ValidationResult => {
    const error: StringLengthError = {
        type: StringLengthErrorType,
        length: length,
        minLength: rule.minLength,
        maxLength: rule.maxLength,
    };

    return {
        error: error,
    };
};

export const validateStringLength = (value: string, rule: ValidateStringLengthRule): ValidationResult => {
    const length = value.length;

    if (rule.minLength !== undefined && length < rule.minLength) {
        return stringLengthError(length, rule);
    }

    if (rule.maxLength !== undefined && length > rule.maxLength) {
        return stringLengthError(length, rule);
    }

    return noError();
};
