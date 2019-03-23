import { ParseError, ParseErrorBase } from "./ParseError";

export const ParsePropsErrorType = Symbol("ParsePropError");

export type ParsePropsError = ParseErrorBase & {
    type: typeof ParsePropsErrorType;
    errors: ParseError[];
};
