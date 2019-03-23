import { ParsePropsErrorType, ParsePropsError } from "../errors/ParsePropsError";
import { ParseError } from "../errors/ParseError";
import { FailedParseResult, FailedParseResultType } from "../ParseResult";

export const failedParseProps = (errors: ParseError[], key?: string): FailedParseResult => {
    const error: ParsePropsError = {
        type: ParsePropsErrorType,
        key: key,
        errors: errors,
    };

    return {
        type: FailedParseResultType,
        error: error,
    };
};
