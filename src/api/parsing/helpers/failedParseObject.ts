import { ParseObjectErrorType, ParseObjectError } from "../errors/ParseObjectError";
import { FailedParseResult, FailedParseResultType } from "../ParseResult";

export const failedParseObject = (key?: string): FailedParseResult => {
    const error: ParseObjectError = {
        type: ParseObjectErrorType,
        key: key,
    };

    return {
        type: FailedParseResultType,
        error: error,
    };
};
