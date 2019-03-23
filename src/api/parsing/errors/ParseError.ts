import { ParsePropsError } from "./ParsePropsError";
import { ParseObjectError } from "./ParseObjectError";

export type ParseErrorBase = {
    key?: string;
};

export type ParseError = ParseObjectError | ParsePropsError;
