import { AccountDoesntExistsError } from "@/db/exceptions/AccountDoesntExistError";
import { ApiError, ApiAccountDoesntExistsError, ApiExceptionError } from "@radoslaw-medryk/bank-core-models";

export const exceptionToApiErrors = (e: Error): ApiError[] => {
    if (e instanceof AccountDoesntExistsError) {
        const apiError: ApiAccountDoesntExistsError = {
            type: "account_doesnt_exists",
        };
        return [apiError];
    }

    const apiError: ApiExceptionError = {
        type: "exception",
    };
    return [apiError];
};
