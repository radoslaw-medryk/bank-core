import { successfulParseResult } from "./helpers/successfulParseResult";
import { ParseResult } from "./ParseResult";
import { parseString } from "./parseString";

export const parseOptionalString = (value: any): ParseResult<string | undefined> => {
    if (value === null || value === undefined) {
        return successfulParseResult(undefined);
    }

    return parseString(value);
};
