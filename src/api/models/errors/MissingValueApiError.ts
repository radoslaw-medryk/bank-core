import { KeyBasedApiError } from "./KeyBasedApiError";

export type MissingValueApiError = KeyBasedApiError & {
    type: "missing_value";
};
