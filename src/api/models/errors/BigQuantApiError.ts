import { KeyBasedApiError } from "./KeyBasedApiError";
import Big from "big.js";

export type BigQuantApiError = KeyBasedApiError & {
    type: "big_quant";
    value: Big;
    quant: Big;
};
