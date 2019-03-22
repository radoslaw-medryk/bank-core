import { StringLengthError } from "./StringLengthError";
import { OutOfRangeError } from "./OutOfRangeError";
import { MissingValueError } from "./MissingValueError";

export type ValidationErrorBase = {
    field: string;
    value: any;
};

export type ValidationError = StringLengthError | OutOfRangeError | MissingValueError;
