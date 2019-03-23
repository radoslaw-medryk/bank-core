import { ParsePropError } from "./ParsePropError";
import { ParseObjectError } from "./ParseObjectError";

export type ParseError = ParseObjectError | ParsePropError;
