import Big from "big.js";
import { Validation } from "rusane";

// TODO [RM]: make rule? really optional (now due to ValidationFunc<...> undefined must be explicitly provided)
export const validateCurrency: Validation.ValidationFunc<Big, undefined> = (
    value: Big,
    rule?: undefined,
    key?: string
): Validation.ValidationResult => {
    return Validation.validateBigQuant(value, { quant: new Big("0.01") }, key); // TODO [RM]: Make configurable
};
