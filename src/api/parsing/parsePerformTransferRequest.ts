import { ParseResult } from "./ParseResult";
import { parseObjectError } from "./helpers/parseObjectError";
import { failedParseResult } from "./helpers/failedParseResult";
import { successfulParseResult } from "./helpers/successfulParseResult";
import { PerformTransferRequest } from "../models/PerformTransferRequest";
import { parseNumber } from "./parseNumber";
import { AnyProps } from "./helpers/AnyProps";
import { parseBig } from "./parseBig";
import { combineErrors } from "./helpers/combineErrors";

export const parsePerformTransferRequest = (value: any): ParseResult<PerformTransferRequest> => {
    if (value === null || value === undefined) {
        return failedParseResult(parseObjectError());
    }

    if (typeof value !== "object") {
        return failedParseResult(parseObjectError());
    }

    const valueAnyProps = value as AnyProps<PerformTransferRequest>;
    const parsedFromId = parseNumber(valueAnyProps.fromId);
    const parsedToId = parseNumber(valueAnyProps.toId);
    const parsedAmount = parseBig(valueAnyProps.amount);

    const parsedErrors = combineErrors(parsedFromId, parsedToId, parsedAmount);
    if (parsedErrors.length > 0) {
        return failedParseResult(); // TODO [RM]: decide how to deal here; how to include prop name in error?
    }
};
