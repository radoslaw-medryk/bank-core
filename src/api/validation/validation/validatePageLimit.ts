import { Validation } from "rusane";

export const validatePageLimit: Validation.ValidationFunc<number | undefined> = (
    value: number | undefined,
    key?: string
) => {
    if (value === undefined) {
        return Validation.noError();
    }

    return Validation.chainValidators(
        value,
        key,
        Validation.validateNumberRange({ minValue: 0, maxValue: 100 }),
        Validation.validateNumberInteger
    );
};
