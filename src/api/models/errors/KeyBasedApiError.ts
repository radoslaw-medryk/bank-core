import { ApiErrorBase } from "./ApiError";

export type KeyBasedApiError = ApiErrorBase & {
    key?: string;
};
