import { ParseResult } from "./ParseResult";
import { failedParseResult } from "./helpers/failedParseResult";
import { parseObjectError } from "./helpers/parseObjectError";
import { successfulParseResult } from "./helpers/successfulParseResult";

export const parseString = (value: any): ParseResult<string> => {
    if (value === null || value === undefined) {
        return failedParseResult(parseObjectError());
    }

    if (typeof value !== "string") {
        return failedParseResult(parseObjectError());
    }

    return successfulParseResult(value);
};
