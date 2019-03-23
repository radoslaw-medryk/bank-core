import { ParseResult } from "./ParseResult";
import { failedParseResult } from "./helpers/failedParseResult";
import { parseObjectError } from "./helpers/parseObjectError";
import { successfulParseResult } from "./helpers/successfulParseResult";
import Big from "big.js";

export const parseBig = (value: any): ParseResult<Big> => {
    if (value === null || value === undefined) {
        return failedParseResult(parseObjectError());
    }

    if (typeof value !== "string") {
        return failedParseResult(parseObjectError());
    }

    try {
        const big = new Big(value);
        return successfulParseResult(big);
    } catch {
        return failedParseResult(parseObjectError());
    }
};
