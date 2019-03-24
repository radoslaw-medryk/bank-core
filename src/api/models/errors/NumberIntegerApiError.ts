import { KeyBasedApiError } from "./KeyBasedApiError";

export type NumberIntegerApiError = KeyBasedApiError & {
    type: "number_integer";
    value: number;
};
