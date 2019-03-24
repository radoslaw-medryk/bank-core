import { ApiErrorResponse } from "../models/ApiResponse";
import { ApiError } from "../models/errors/ApiError";

export const apiErrorResponse = (errors: ApiError[]): ApiErrorResponse => {
    return {
        errors: errors,
    };
};
