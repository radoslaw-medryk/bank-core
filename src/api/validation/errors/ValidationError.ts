import { StringLengthError } from "./StringLengthError";
import { NumberRangeError } from "./NumberRangeError";
import { BigRangeError } from "./BigRangeError";
import { ValidationPropsError } from "./ValidationPropsError";
import { BigQuantError } from "./BigQuantError";
import { ValidationMultiError } from "./ValidationMultiError";
import { NumberIntegerError } from "./NumberIntegerError";

export type ValidationErrorBase = {
    key?: string;
};

export type ValidationError =
    | StringLengthError
    | NumberRangeError
    | BigRangeError
    | ValidationPropsError
    | BigQuantError
    | ValidationMultiError
    | NumberIntegerError;
