import { ParseError } from "../errors/ParseError";
import { FailedParseResult } from "../ParseResult";

export const failedParseResult = (errors: ParseError | ParseError[]): FailedParseResult => {
    return {
        errors: Array.isArray(errors) ? errors : [errors],
    };
};
