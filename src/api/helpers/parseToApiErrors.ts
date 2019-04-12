import { Parsing } from "rusane";
import { ApiError, ApiInvalidValueError, ApiMissingValueError } from "@radoslaw-medryk/bank-core-shared";

const nestedParseToApiError = (error: Parsing.ParseError): ApiError => {
    if (error.type === Parsing.ParseObjectErrorType || error.type === Parsing.ParsePropsErrorType) {
        const apiError: ApiInvalidValueError = {
            type: "invalid_value",
            key: error.key,
        };
        return apiError;
    }

    if (error.type === Parsing.MissingValueErrorType) {
        const apiError: ApiMissingValueError = {
            type: "missing_value",
            key: error.key,
        };
        return apiError;
    }

    throw new Error("Unsupported error.type.");
};

export const parseToApiErrors = (error: Parsing.ParseError): ApiError[] => {
    if (error.type === Parsing.ParseObjectErrorType || error.type === Parsing.MissingValueErrorType) {
        const apiError = nestedParseToApiError(error);
        return [apiError];
    }

    if (error.type === Parsing.ParsePropsErrorType) {
        const apiErrors = error.errors.map(q => nestedParseToApiError(q));
        return apiErrors;
    }

    throw new Error(`Unsupported error.type.`);
};
