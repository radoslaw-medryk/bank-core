import Big from "big.js";

export const BigQuantErrorType = Symbol("BigQuantError");

export type BigQuantError = {
    type: typeof BigQuantErrorType;
    value: Big;
    quant: Big;
};
