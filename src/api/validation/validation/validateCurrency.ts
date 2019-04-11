import Big from "big.js";
import { Validation } from "rusane";

export const validateCurrency: Validation.ValidationFunc<Big> = (
    value: Big,
    key?: string
): Validation.ValidationResult => {
    return Validation.validateBigQuant({ quant: new Big("0.01") })(value, key); // TODO [RM]: Make configurable
};
