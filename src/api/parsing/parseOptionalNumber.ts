import { successfulParseResult } from "./helpers/successfulParseResult";
import { ParseResult } from "./ParseResult";
import { parseNumber } from "./parseNumber";

export const parseOptionalNumber = (value: any): ParseResult<number | undefined> => {
    if (value === null || value === undefined) {
        return successfulParseResult(undefined);
    }

    return parseNumber(value);
};
