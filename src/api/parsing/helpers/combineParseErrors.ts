import { ParseResult, FailedParseResult, isFailedParseResult } from "../ParseResult";
import { ParseError } from "../errors/ParseError";

export const combineParseErrors = (...results: ParseResult<any>[]): ParseError[] => {
    const failedResults = results.filter(q => isFailedParseResult(q)) as FailedParseResult[];
    return failedResults.map(q => q.error);
};
