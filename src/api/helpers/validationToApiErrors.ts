import { Validation } from "rusane";
import {
    ApiError,
    ApiNumberIntegerError,
    ApiBigQuantError,
    ApiBigRangeError,
    ApiNumberRangeError,
    ApiStringLengthError,
    ApiOtherError,
} from "@radoslaw-medryk/bank-core-shared";

const nestedValidationToApiErrors = (error: Validation.ValidationError, ommitKey: boolean): ApiError[] => {
    const key = ommitKey ? undefined : error.key;

    if (error.type === Validation.ValidationMultiErrorType) {
        const apiErrors = error.errors
            .map(q => nestedValidationToApiErrors(q, false))
            .reduce((prev, curr) => {
                return [...prev, ...curr];
            }, []);
        return apiErrors;
    }

    if (error.type === Validation.ValidationPropsErrorType) {
        const apiError: ApiOtherError = {
            type: "other",
            key: key,
        };
        return [apiError];
    }

    if (error.type === Validation.StringLengthErrorType) {
        const apiError: ApiStringLengthError = {
            type: "string_length",
            key: key,
            length: error.length,
            minLength: error.minLength,
            maxLength: error.maxLength,
        };
        return [apiError];
    }

    if (error.type === Validation.NumberRangeErrorType) {
        const apiError: ApiNumberRangeError = {
            type: "number_range",
            key: key,
            value: error.value,
            minValue: error.minValue,
            maxValue: error.maxValue,
        };
        return [apiError];
    }

    if (error.type === Validation.BigRangeErrorType) {
        const apiError: ApiBigRangeError = {
            type: "big_range",
            key: key,
            value: error.value,
            minValue: error.minValue,
            maxValue: error.maxValue,
        };
        return [apiError];
    }

    if (error.type === Validation.BigQuantErrorType) {
        const apiError: ApiBigQuantError = {
            type: "big_quant",
            key: key,
            value: error.value,
            quant: error.quant,
        };
        return [apiError];
    }

    if (error.type === Validation.NumberIntegerErrorType) {
        const apiError: ApiNumberIntegerError = {
            type: "number_integer",
            key: key,
            value: error.value,
        };
        return [apiError];
    }

    throw new Error("Unsupported error.type.");
};

export const validationToApiErrors = (error: Validation.ValidationError): ApiError[] => {
    if (error.type === Validation.ValidationMultiErrorType) {
        const apiErrors = error.errors
            .map(q => nestedValidationToApiErrors(q, true))
            .reduce((prev, curr) => {
                return [...prev, ...curr];
            }, []);
        return apiErrors;
    }

    if (error.type === Validation.ValidationPropsErrorType) {
        const apiErrors = error.errors
            .map(q => nestedValidationToApiErrors(q, false))
            .reduce((prev, curr) => {
                return [...prev, ...curr];
            }, []);
        return apiErrors;
    }

    const apiError = nestedValidationToApiErrors(error, false);
    return apiError;
};
