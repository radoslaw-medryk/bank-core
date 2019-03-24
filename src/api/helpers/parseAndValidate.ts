import { ParsedAndValidated } from "./ParsedAndValidated";
import { ParseResult } from "rusane/dist/parsing";
import { ValidationResult } from "rusane/dist/validation";
import { Parsing } from "rusane";
import { parseToApiErrors } from "./parseToApiErrors";
import { validationToApiErrors } from "./validationToApiErrors";
import { ApiError } from "../models/errors/ApiError";

const parsedAndValidatedErrors = <T>(errors: ApiError[]): ParsedAndValidated<T> => {
    return {
        errors: [...errors],
        value: undefined,
    };
};

const parsedAndValidatedSuccess = <T>(value: T): ParsedAndValidated<T> => {
    return {
        errors: undefined,
        value: value,
    };
};

export const parseAndValidate = <TIn extends any, TParsed>(
    value: TIn,
    parseFunc: (value: TIn) => ParseResult<TParsed>,
    validateFunc: (value: TParsed) => ValidationResult
): ParsedAndValidated<TParsed> => {
    const parsedValue = parseFunc(value);

    if (Parsing.isFailedParseResult(parsedValue)) {
        const apiErrors = parseToApiErrors(parsedValue.error);
        return parsedAndValidatedErrors(apiErrors);
    }

    const validationResult = validateFunc(parsedValue.value);
    if (validationResult.error) {
        const apiErrors = validationToApiErrors(validationResult.error);
        return parsedAndValidatedErrors(apiErrors);
    }

    return parsedAndValidatedSuccess(parsedValue.value);
};
