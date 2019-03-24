import { ApiError } from "../models/errors/ApiError";

export type ParsedAndValidatedFailed = {
    errors: ApiError[];
    value: undefined;
};

export type ParsedAndValidatedSuccess<T> = {
    errors: undefined;
    value: T;
};

export type ParsedAndValidated<T> = ParsedAndValidatedFailed | ParsedAndValidatedSuccess<T>;
