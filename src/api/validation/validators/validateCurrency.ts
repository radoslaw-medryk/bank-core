import Big from "big.js";
import { ValidationResult } from "../ValidationResult";
import { validateBigQuant } from "./validateBigQuant";

export const validateCurrency = (value: Big): ValidationResult => {
    return validateBigQuant(value, { quant: new Big("0.01") }); // TODO [RM]: Make configurable
};
