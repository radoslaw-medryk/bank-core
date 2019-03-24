import Big from "big.js";
import { ValidationResult } from "../ValidationResult";
import { validateBigQuant } from "./validateBigQuant";
import { ValidationFunc } from "../ValidationFunc";

// TODO [RM]: make rule? really optional (now due to ValidationFunc<...> undefined must be explicitly provided)
export const validateCurrency: ValidationFunc<Big, undefined> = (
    value: Big,
    rule?: undefined,
    key?: string
): ValidationResult => {
    return validateBigQuant(value, { quant: new Big("0.01") }, key); // TODO [RM]: Make configurable
};
