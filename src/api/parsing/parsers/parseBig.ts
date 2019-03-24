import { failedParseObject } from "../helpers/failedParseObject";
import { successfulParse } from "../helpers/successfulParse";
import Big from "big.js";
import { ParseFunc } from "../ParseFunc";
import { missingValueError } from "../helpers/missingValueError";

export const parseBig: ParseFunc<Big> = (value: any, key?: string) => {
    if (value === null || value === undefined) {
        return missingValueError(key);
    }

    if (typeof value !== "string") {
        return failedParseObject(key);
    }

    try {
        const big = new Big(value);
        return successfulParse(big);
    } catch {
        return failedParseObject(key);
    }
};

export const parseOptionalBig: ParseFunc<Big | undefined> = (value: any, key?: string) => {
    if (value === null || value === undefined) {
        return successfulParse(undefined);
    }

    return parseBig(value, key);
};
