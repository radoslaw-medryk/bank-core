import { KeyBasedApiError } from "./KeyBasedApiError";

export type InvalidValueApiError = KeyBasedApiError & {
    type: "invalid_value";
};
