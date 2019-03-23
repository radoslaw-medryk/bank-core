import { ParseErrorBase } from "./ParseError";

export const ParseObjectErrorType = Symbol("ParseObjectError");

export type ParseObjectError = ParseErrorBase & {
    type: typeof ParseObjectErrorType;
};
