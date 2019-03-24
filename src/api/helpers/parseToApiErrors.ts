import { ApiError } from "@/api/models/errors/ApiError";
import { ParseError } from "@/api/parsing/errors/ParseError";
import { ParseObjectErrorType } from "@/api/parsing/errors/ParseObjectError";
import { InvalidValueApiError } from "@/api/models/errors/InvalidValueApiError";
import { ParsePropsErrorType } from "@/api/parsing/errors/ParsePropsError";
import { MissingValueErrorType } from "../parsing/errors/MissingValueError";
import { MissingValueApiError } from "../models/errors/MissingValueApiError";

const nestedParseToApiError = (error: ParseError): ApiError => {
    if (error.type === ParseObjectErrorType || error.type === ParsePropsErrorType) {
        const apiError: InvalidValueApiError = {
            type: "invalid_value",
            key: error.key,
        };
        return apiError;
    }

    if (error.type === MissingValueErrorType) {
        const apiError: MissingValueApiError = {
            type: "missing_value",
            key: error.key,
        };
        return apiError;
    }

    throw new Error("Unsupported error.type.");
};

export const parseToApiErrors = (error: ParseError): ApiError[] => {
    if (error.type === ParseObjectErrorType || error.type === MissingValueErrorType) {
        const apiError = nestedParseToApiError(error);
        return [apiError];
    }

    if (error.type === ParsePropsErrorType) {
        const apiErrors = error.errors.map(q => nestedParseToApiError(q));
        return apiErrors;
    }

    throw new Error(`Unsupported error.type.`);
};
