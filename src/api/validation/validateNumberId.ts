import { Validation } from "rusane";
import { Int32 } from "./helpers/Int32";

export const validateNumberId: Validation.ValidationFunc<number, undefined> = (
    value: number,
    rule?: undefined,
    key?: string
): Validation.ValidationResult => {
    return Validation.chainValidators(
        value,
        [
            val => Validation.validateNumberRange(val, { minValue: 1, maxValue: Int32.MaxValue }, key),
            val => Validation.validateNumberInteger(val, undefined, key),
        ],
        key
    );
};
