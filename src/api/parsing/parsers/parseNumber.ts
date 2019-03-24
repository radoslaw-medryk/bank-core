import { failedParseObject } from "../helpers/failedParseObject";
import { successfulParse } from "../helpers/successfulParse";
import { ParseFunc } from "../ParseFunc";
import { missingValueError } from "../helpers/missingValueError";

export const parseNumber: ParseFunc<number> = (value: any, key?: string) => {
    if (value === null || value === undefined) {
        return missingValueError(key);
    }

    if (typeof value !== "number") {
        return failedParseObject(key);
    }

    return successfulParse(value);
};

export const parseOptionalNumber: ParseFunc<number | undefined> = (value: any, key?: string) => {
    if (value === null || value === undefined) {
        return successfulParse(undefined);
    }

    return parseNumber(value, key);
};
