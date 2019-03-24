import { Big } from "big.js";
import { Validation } from "rusane";
import { validateCurrency } from "./validateCurrency";
import { PerformTransferRequest } from "@/api/models/PerformTransferRequest";
import { validateNumberId } from "./validateNumberId";

const validateAmount = (value: Big, rule?: undefined, key?: string) => {
    return Validation.chainValidators(
        value,
        [
            amount => Validation.validateBigRange(amount, { minValue: new Big("0.01") }, key),
            amount => validateCurrency(amount, undefined, key),
        ],
        key
    );
};

export const validatePerformTransferRequest: Validation.ValidationFunc<PerformTransferRequest, undefined> = (
    value: PerformTransferRequest,
    rule?: undefined,
    key?: string
): Validation.ValidationResult => {
    const validatedFromId = Validation.validateProp(value, "fromId", validateNumberId, undefined);
    const validatedToId = Validation.validateProp(value, "toId", validateNumberId, undefined);
    const validatedAmount = Validation.validateProp(value, "amount", validateAmount, undefined);

    if (validatedFromId.error || validatedToId.error || validatedAmount.error) {
        const errors = Validation.combineValidationErrors(validatedFromId, validatedToId, validatedAmount);
        return Validation.failedValidateProps(errors);
    }

    return Validation.noError();
};
