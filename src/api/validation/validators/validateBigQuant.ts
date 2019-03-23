import { ValidationResult } from "../ValidationResult";
import Big from "big.js";
import { BigQuantError, BigQuantErrorType } from "../errors/BigQuantError";
import { noError } from "../helpers/noError";

type ValidateBigQuantRule = {
    quant: Big;
};

const bigQuantError = (value: Big, rule: ValidateBigQuantRule): ValidationResult => {
    const error: BigQuantError = {
        type: BigQuantErrorType,
        value: value,
        quant: rule.quant,
    };

    return {
        error: error,
    };
};

export const validateBigQuant = (value: Big, rule: ValidateBigQuantRule): ValidationResult => {
    if (!value.mod(rule.quant).eq(0)) {
        return bigQuantError(value, rule);
    }

    return noError();
};
