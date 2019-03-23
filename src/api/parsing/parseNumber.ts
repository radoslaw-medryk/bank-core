import { ParseResult } from "./ParseResult";
import { parseObjectError } from "./helpers/parseObjectError";
import { failedParseResult } from "./helpers/failedParseResult";
import { successfulParseResult } from "./helpers/successfulParseResult";

export const parseNumber = (value: any): ParseResult<number> => {
    if (value === null || value === undefined) {
        return failedParseResult(parseObjectError());
    }

    if (typeof value !== "number") {
        return failedParseResult(parseObjectError());
    }

    return successfulParseResult(value);
};
