import {
    ApiError,
    ApiExceptionError,
    ApiResourceDoesntExistsError,
    ApiResourceAlreadyExistsError,
} from "@radoslaw-medryk/bank-core-shared";
import { ParsingFailedError } from "../exceptions/ParsingFailedError";
import { parseToApiErrors } from "./parseToApiErrors";
import { ValidationFailedError } from "../exceptions/ValidationFailedError";
import { validationToApiErrors } from "./validationToApiErrors";
import { ResourceDoesntExistsError } from "@/db/exceptions/ResourceDoesntExistError";
import { ResourceAlreadyExistsError } from "@/db/exceptions/ResourceAlreadyExistsError";

export const exceptionToApiErrors = (e: Error): ApiError[] => {
    if (e instanceof ResourceDoesntExistsError) {
        const apiError: ApiResourceDoesntExistsError = {
            type: "resource_doesnt_exists",
            resourceName: e.resourceName,
            resourceId: e.resourceId,
        };
        return [apiError];
    }

    if (e instanceof ResourceAlreadyExistsError) {
        const apiError: ApiResourceAlreadyExistsError = {
            type: "resource_already_exists",
            resourceName: e.resourceName,
            resourceId: e.resourceId,
        };
        return [apiError];
    }

    if (e instanceof ParsingFailedError) {
        const apiErrors = parseToApiErrors(e.error);
        return apiErrors;
    }

    if (e instanceof ValidationFailedError) {
        const apiErrors = validationToApiErrors(e.error);
        return apiErrors;
    }

    const apiError: ApiExceptionError = {
        type: "exception",
        message: e.message,
        stack: e.stack,
    };
    return [apiError];
};
