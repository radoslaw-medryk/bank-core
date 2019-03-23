import { ParseError } from "./errors/ParseError";

export const SuccessfulParseResultType = Symbol("SuccessfulParseResult");
export const FailedParseResultType = Symbol("FailedParseResult");

export type ParseResult<T> = SuccessfulParseResult<T> | FailedParseResult;

export type SuccessfulParseResult<T> = {
    type: typeof SuccessfulParseResultType;
    value: T;
};

export type FailedParseResult = {
    type: typeof FailedParseResultType;
    error: ParseError;
};

export const isFailedParseResult = <T>(result: ParseResult<T>): result is FailedParseResult => {
    return result.type === FailedParseResultType;
};

export const isSuccessfulParseResult = <T>(result: ParseResult<T>): result is SuccessfulParseResult<T> => {
    return result.type === SuccessfulParseResultType;
};
