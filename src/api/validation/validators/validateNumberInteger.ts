import { ValidationResult } from "../ValidationResult";
import { ValidationFunc } from "../ValidationFunc";
import { NumberIntegerError, NumberIntegerErrorType } from "../errors/NumberIntegerError";
import { noError } from "../helpers/noError";

const numberIntegerError = (value: number, key?: string): ValidationResult => {
    const error: NumberIntegerError = {
        type: NumberIntegerErrorType,
        key: key,
        value: value,
    };

    return {
        error: error,
    };
};

export const validateNumberInteger: ValidationFunc<number, undefined> = (
    value: number,
    rule?: undefined,
    key?: string
): ValidationResult => {
    if (!Number.isInteger(value)) {
        return numberIntegerError(value, key);
    }

    return noError();
};
