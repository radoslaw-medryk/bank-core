import { AccountDoesntExistsError } from "@/db/exceptions/AccountDoesntExistError";
import { AccountDoesntExistsApiError } from "../models/errors/AccountDoesntExistsApiError";
import { ExceptionApiError } from "../models/errors/ExceptionApiError";
import { ApiError } from "../models/errors/ApiError";

export const exceptionToApiErrors = (e: Error): ApiError[] => {
    if (e instanceof AccountDoesntExistsError) {
        const apiError: AccountDoesntExistsApiError = {
            type: "account_doesnt_exists",
        };
        return [apiError];
    }

    const apiError: ExceptionApiError = {
        type: "exception",
    };
    return [apiError];
};
