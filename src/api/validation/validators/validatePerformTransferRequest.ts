import { ValidationResult } from "../ValidationResult";
import { PerformTransferRequest } from "@/api/models/PerformTransferRequest";
import { validateNumberId } from "./validateNumberId";
import { validateBigRange } from "./validateBigRange";
import { failedValidateProps } from "../helpers/failedValidateProps";
import { combineValidationErrors } from "../helpers/combineValidationErrors";
import { noError } from "../helpers/noError";
import { Big } from "big.js";
import { chainValidators } from "./chainValidators";
import { validateCurrency } from "./validateCurrency";
import { validateProp } from "../helpers/validateProp";
import { ValidationFunc } from "../ValidationFunc";

const validateAmount = (value: Big, rule?: undefined, key?: string) => {
    return chainValidators(
        value,
        [
            amount => validateBigRange(amount, { minValue: new Big("0.01") }, key),
            amount => validateCurrency(amount, undefined, key),
        ],
        key
    );
};

export const validatePerformTransferRequest: ValidationFunc<PerformTransferRequest, undefined> = (
    value: PerformTransferRequest,
    rule?: undefined,
    key?: string
): ValidationResult => {
    const validatedFromId = validateProp(value, "fromId", validateNumberId, undefined);
    const validatedToId = validateProp(value, "toId", validateNumberId, undefined);
    const validatedAmount = validateProp(value, "amount", validateAmount, undefined);

    if (validatedFromId.error || validatedToId.error || validatedAmount.error) {
        const errors = combineValidationErrors(validatedFromId, validatedToId, validatedAmount);
        return failedValidateProps(errors);
    }

    return noError();
};
