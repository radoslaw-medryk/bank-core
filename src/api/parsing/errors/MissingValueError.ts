import { ParseErrorBase } from "./ParseError";

export const MissingValueErrorType = Symbol("MissingValueError");

export type MissingValueError = ParseErrorBase & {
    type: typeof MissingValueErrorType;
};
