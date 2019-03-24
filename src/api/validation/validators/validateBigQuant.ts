import { ValidationResult } from "../ValidationResult";
import Big from "big.js";
import { BigQuantError, BigQuantErrorType } from "../errors/BigQuantError";
import { noError } from "../helpers/noError";
import { ValidationFunc } from "../ValidationFunc";

type ValidateBigQuantRule = {
    quant: Big;
};

const bigQuantError = (value: Big, rule: ValidateBigQuantRule, key?: string): ValidationResult => {
    const error: BigQuantError = {
        type: BigQuantErrorType,
        key: key,
        value: value,
        quant: rule.quant,
    };

    return {
        error: error,
    };
};

export const validateBigQuant: ValidationFunc<Big, ValidateBigQuantRule> = (
    value: Big,
    rule: ValidateBigQuantRule,
    key?: string
): ValidationResult => {
    if (!value.mod(rule.quant).eq(0)) {
        return bigQuantError(value, rule, key);
    }

    return noError();
};
