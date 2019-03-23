import { ParseResult, FailedParseResult } from "../ParseResult";
import { ParseError } from "../errors/ParseError";

export const combineErrors = (...results: Array<ParseResult<any>>): ParseError[] => {
    return (results as Array<FailedParseResult>)
        .map(q => (q.errors ? q.errors : []))
        .reduce((prev, curr, i) => [...prev, ...curr], []);
};
