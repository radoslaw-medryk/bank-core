import { KeyBasedApiError } from "./KeyBasedApiError";
import Big from "big.js";

export type BigRangeApiError = KeyBasedApiError & {
    type: "big_range";
    value: Big;
    minValue?: Big;
    maxValue?: Big;
};
