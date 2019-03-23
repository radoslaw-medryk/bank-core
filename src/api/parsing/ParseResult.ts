import { ParseError } from "./errors/ParseError";

export type ParseResult<T> = SuccessfulParseResult<T> | FailedParseResult;

export type SuccessfulParseResult<T> = {
    value: T;
};

export type FailedParseResult = {
    errors: ParseError[];
};
