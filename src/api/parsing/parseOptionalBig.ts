import { successfulParseResult } from "./helpers/successfulParseResult";
import { ParseResult } from "./ParseResult";
import Big from "big.js";
import { parseBig } from "./parseBig";

export const parseOptionalBig = (value: any): ParseResult<Big | undefined> => {
    if (value === null || value === undefined) {
        return successfulParseResult(undefined);
    }

    return parseBig(value);
};
