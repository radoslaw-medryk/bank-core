import { ValidationResult } from "../ValidationResult";
import { noError } from "../helpers/noError";
import { NumberRangeError, NumberRangeErrorType } from "../errors/NumberRangeError";
import { ValidationFunc } from "../ValidationFunc";

type ValidateNumberRangeRule = {
    minValue?: number;
    maxValue?: number;
};

const numberRangeError = (value: number, rule: ValidateNumberRangeRule, key?: string): ValidationResult => {
    const error: NumberRangeError = {
        type: NumberRangeErrorType,
        key: key,
        value: value,
        minValue: rule.minValue,
        maxValue: rule.maxValue,
    };

    return {
        error: error,
    };
};

export const validateNumberRange: ValidationFunc<number, ValidateNumberRangeRule> = (
    value: number,
    rule: ValidateNumberRangeRule,
    key?: string
): ValidationResult => {
    if (rule.minValue !== undefined && value < rule.minValue) {
        return numberRangeError(value, rule, key);
    }

    if (rule.maxValue !== undefined && value > rule.maxValue) {
        return numberRangeError(value, rule, key);
    }

    return noError();
};
