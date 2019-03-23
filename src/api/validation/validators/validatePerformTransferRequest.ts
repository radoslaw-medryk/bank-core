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

export const validatePerformTransferRequest = (value: PerformTransferRequest): ValidationResult => {
    const validateFromId = validateNumberId(value.fromId);
    const validateToId = validateNumberId(value.toId);
    const validateAmount = chainValidators(value.amount, [
        amount => validateBigRange(amount, { minValue: new Big(0) }),
        amount => validateCurrency(amount),
    ]);

    if (validateFromId.error || validateToId.error || validateAmount.error) {
        const errors = combineValidationErrors(validateFromId, validateToId, validateAmount);
        return failedValidateProps(errors);
    }

    return noError();
};
