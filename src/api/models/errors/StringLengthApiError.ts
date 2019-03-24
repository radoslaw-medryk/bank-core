import { KeyBasedApiError } from "./KeyBasedApiError";

export type StringLengthApiError = KeyBasedApiError & {
    type: "string_length";
    length: number;
    minLength?: number;
    maxLength?: number;
};
