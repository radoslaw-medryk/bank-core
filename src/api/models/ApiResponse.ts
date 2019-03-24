import { ApiError } from "./errors/ApiError";

export type ApiSuccessfulResponse<T> = {
    data: T;
};

export type ApiErrorResponse = {
    errors: ApiError[];
};

export type ApiResponse<T> = ApiSuccessfulResponse<T> | ApiErrorResponse;
