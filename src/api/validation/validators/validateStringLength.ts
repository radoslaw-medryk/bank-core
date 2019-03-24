import { ValidationResult } from "../ValidationResult";
import { StringLengthError, StringLengthErrorType } from "../errors/StringLengthError";
import { noError } from "../helpers/noError";
import { ValidationFunc } from "../ValidationFunc";

type ValidateStringLengthRule = {
    minLength?: number;
    maxLength?: number;
};

const stringLengthError = (length: number, rule: ValidateStringLengthRule, key?: string): ValidationResult => {
    const error: StringLengthError = {
        type: StringLengthErrorType,
        key: key,
        length: length,
        minLength: rule.minLength,
        maxLength: rule.maxLength,
    };

    return {
        error: error,
    };
};

export const validateStringLength: ValidationFunc<string, ValidateStringLengthRule> = (
    value: string,
    rule: ValidateStringLengthRule,
    key?: string
): ValidationResult => {
    const length = value.length;

    if (rule.minLength !== undefined && length < rule.minLength) {
        return stringLengthError(length, rule, key);
    }

    if (rule.maxLength !== undefined && length > rule.maxLength) {
        return stringLengthError(length, rule, key);
    }

    return noError();
};
