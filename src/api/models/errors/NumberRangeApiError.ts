import { KeyBasedApiError } from "./KeyBasedApiError";

export type NumberRangeApiError = KeyBasedApiError & {
    type: "number_range";
    value: number;
    minValue?: number;
    maxValue?: number;
};
