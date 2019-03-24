import { FailedParseResult, FailedParseResultType } from "../ParseResult";
import { MissingValueError, MissingValueErrorType } from "../errors/MissingValueError";

export const missingValueError = (key?: string): FailedParseResult => {
    const error: MissingValueError = {
        type: MissingValueErrorType,
        key: key,
    };

    return {
        type: FailedParseResultType,
        error: error,
    };
};
