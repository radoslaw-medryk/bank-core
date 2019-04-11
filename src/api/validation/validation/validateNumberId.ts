import { Validation } from "rusane";

class Int32 {
    public static MaxValue: number = 2147483647;
    public static MinValue: number = -2147483648;
}

export const validateNumberId: Validation.ValidationFunc<number | undefined> = (
    value: number | undefined,
    key?: string
): Validation.ValidationResult => {
    if (value === undefined) {
        return Validation.noError();
    }

    return Validation.chainValidators(
        value,
        key,
        Validation.validateNumberRange({ minValue: 1, maxValue: Int32.MaxValue }),
        Validation.validateNumberInteger
    );
};
