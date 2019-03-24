import Big from "big.js";
import { ValidationErrorBase } from "./ValidationError";

export const BigQuantErrorType = Symbol("BigQuantError");

export type BigQuantError = ValidationErrorBase & {
    type: typeof BigQuantErrorType;
    value: Big;
    quant: Big;
};
