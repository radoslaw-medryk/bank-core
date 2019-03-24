import { validateNumberRange } from "./validateNumberRange";
import { Int32 } from "../helpers/Int32";
import { ValidationResult } from "../ValidationResult";
import { ValidationFunc } from "../ValidationFunc";
import { chainValidators } from "./chainValidators";
import { validateNumberInteger } from "./validateNumberInteger";

export const validateNumberId: ValidationFunc<number, undefined> = (
    value: number,
    rule?: undefined,
    key?: string
): ValidationResult => {
    return chainValidators(
        value,
        [
            val => validateNumberRange(val, { minValue: 1, maxValue: Int32.MaxValue }, key),
            val => validateNumberInteger(val, undefined, key),
        ],
        key
    );
};
