import { ValidationError } from "@/api/validation/errors/ValidationError";
import { ApiError } from "@/api/models/errors/ApiError";
import { ValidationMultiErrorType } from "@/api/validation/errors/ValidationMultiError";
import { OtherApiError } from "@/api/models/errors/OtherApiError";
import { ValidationPropsErrorType } from "@/api/validation/errors/ValidationPropsError";
import { StringLengthErrorType } from "@/api/validation/errors/StringLengthError";
import { StringLengthApiError } from "@/api/models/errors/StringLengthApiError";
import { NumberRangeErrorType } from "@/api/validation/errors/NumberRangeError";
import { NumberRangeApiError } from "@/api/models/errors/NumberRangeApiError";
import { BigRangeErrorType } from "@/api/validation/errors/BigRangeError";
import { BigRangeApiError } from "@/api/models/errors/BigRangeApiError";
import { BigQuantErrorType } from "@/api/validation/errors/BigQuantError";
import { BigQuantApiError } from "@/api/models/errors/BigQuantApiError";
import { NumberIntegerErrorType } from "../validation/errors/NumberIntegerError";
import { NumberIntegerApiError } from "../models/errors/NumberIntegerApiError";

// TODO [RM]: cleanup & rewrite;

// TODO [RM]: handle key in multi-error scenarios

const nestedValidationToApiErrors = (error: ValidationError, ommitKey: boolean): ApiError[] => {
    const key = ommitKey ? undefined : error.key;

    if (error.type === ValidationMultiErrorType) {
        const apiErrors = error.errors
            .map(q => nestedValidationToApiErrors(q, false))
            .reduce((prev, curr) => {
                return [...prev, ...curr];
            }, []);
        return apiErrors;
    }

    if (error.type === ValidationPropsErrorType) {
        const apiError: OtherApiError = {
            type: "other",
            key: key,
        };
        return [apiError];
    }

    if (error.type === StringLengthErrorType) {
        const apiError: StringLengthApiError = {
            type: "string_length",
            key: key,
            length: error.length,
            minLength: error.minLength,
            maxLength: error.maxLength,
        };
        return [apiError];
    }

    if (error.type === NumberRangeErrorType) {
        const apiError: NumberRangeApiError = {
            type: "number_range",
            key: key,
            value: error.value,
            minValue: error.minValue,
            maxValue: error.maxValue,
        };
        return [apiError];
    }

    if (error.type === BigRangeErrorType) {
        const apiError: BigRangeApiError = {
            type: "big_range",
            key: key,
            value: error.value,
            minValue: error.minValue,
            maxValue: error.maxValue,
        };
        return [apiError];
    }

    if (error.type === BigQuantErrorType) {
        const apiError: BigQuantApiError = {
            type: "big_quant",
            key: key,
            value: error.value,
            quant: error.quant,
        };
        return [apiError];
    }

    if (error.type === NumberIntegerErrorType) {
        const apiError: NumberIntegerApiError = {
            type: "number_integer",
            key: key,
            value: error.value,
        };
        return [apiError];
    }

    throw new Error("Unsupported error.type.");
};

export const validationToApiErrors = (error: ValidationError): ApiError[] => {
    if (error.type === ValidationMultiErrorType) {
        const apiErrors = error.errors
            .map(q => nestedValidationToApiErrors(q, true))
            .reduce((prev, curr) => {
                return [...prev, ...curr];
            }, []);
        return apiErrors;
    }

    if (error.type === ValidationPropsErrorType) {
        const apiErrors = error.errors
            .map(q => nestedValidationToApiErrors(q, false))
            .reduce((prev, curr) => {
                return [...prev, ...curr];
            }, []);
        return apiErrors;
    }

    const apiError = nestedValidationToApiErrors(error, true);
    return apiError;
};
