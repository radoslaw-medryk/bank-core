import { ParsePropsError } from "./ParsePropsError";
import { ParseObjectError } from "./ParseObjectError";
import { MissingValueError } from "./MissingValueError";

export type ParseErrorBase = {
    key?: string;
};

export type ParseError = ParseObjectError | ParsePropsError | MissingValueError;
