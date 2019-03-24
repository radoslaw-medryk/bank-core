import { KeyBasedApiError } from "./KeyBasedApiError";

export type OtherApiError = KeyBasedApiError & {
    type: "other";
};
