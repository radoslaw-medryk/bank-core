import { BigQuantApiError } from "./BigQuantApiError";
import { BigRangeApiError } from "./BigRangeApiError";
import { MissingValueApiError } from "./MissingValueApiError";
import { NumberRangeApiError } from "./NumberRangeApiError";
import { OtherApiError } from "./OtherApiError";
import { InvalidValueApiError } from "./InvalidValueApiError";
import { StringLengthApiError } from "./StringLengthApiError";
import { NumberIntegerApiError } from "./NumberIntegerApiError";
import { ExceptionApiError } from "./ExceptionApiError";
import { AccountDoesntExistsApiError } from "./AccountDoesntExistsApiError";

export type ApiErrorBase = {};

export type ApiError =
    | BigQuantApiError
    | BigRangeApiError
    | MissingValueApiError
    | NumberRangeApiError
    | OtherApiError
    | InvalidValueApiError
    | StringLengthApiError
    | NumberIntegerApiError
    | ExceptionApiError
    | AccountDoesntExistsApiError;
