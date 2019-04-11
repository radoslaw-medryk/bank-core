import Big from "big.js";
import { Validation } from "rusane";
import { validateCurrency } from "./validateCurrency";

export const validateAmount: Validation.ValidationFunc<Big> = (value: Big, key?: string) => {
    return Validation.chainValidators(
        value,
        key,
        Validation.validateBigRange({ minValue: new Big("0.01") }),
        validateCurrency
    );
};
