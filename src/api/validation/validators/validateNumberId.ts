import { validateNumberRange } from "./validateNumberRange";
import { Int32 } from "../helpers/Int32";
import { ValidationResult } from "../ValidationResult";

export const validateNumberId = (value: number): ValidationResult => {
    return validateNumberRange(value, { minValue: 1, maxValue: Int32.MaxValue });
};
