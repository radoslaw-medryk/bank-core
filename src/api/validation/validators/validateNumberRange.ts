import { ValidationResult } from "../ValidationResult";
import { noError } from "../helpers/noError";
import { NumberRangeError, NumberRangeErrorType } from "../errors/NumberRangeError";

type ValidateNumberRangeRule = {
    minValue?: number;
    maxValue?: number;
};

const numberRangeError = (value: number, rule: ValidateNumberRangeRule): ValidationResult => {
    const error: NumberRangeError = {
        type: NumberRangeErrorType,
        value: value,
        minValue: rule.minValue,
        maxValue: rule.maxValue,
    };

    return {
        error: error,
    };
};

export const validateNumberRange = (value: number, rule: ValidateNumberRangeRule): ValidationResult => {
    if (rule.minValue !== undefined && value < rule.minValue) {
        return numberRangeError(value, rule);
    }

    if (rule.maxValue !== undefined && value > rule.maxValue) {
        return numberRangeError(value, rule);
    }

    return noError();
};
