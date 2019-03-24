import { ParseResult, isFailedParseResult } from "../ParseResult";
import { failedParseObject } from "../helpers/failedParseObject";
import { successfulParse } from "../helpers/successfulParse";
import { PerformTransferRequest } from "../../models/PerformTransferRequest";
import { parseNumber } from "./parseNumber";
import { AnyProps } from "../helpers/AnyProps";
import { parseBig } from "./parseBig";
import { parseProp } from "../helpers/parseProp";
import { combineParseErrors } from "../helpers/combineParseErrors";
import { failedParseProps } from "../helpers/failedParseProps";
import { missingValueError } from "../helpers/missingValueError";

export const parsePerformTransferRequest = (value: any, key?: string): ParseResult<PerformTransferRequest> => {
    if (value === null || value === undefined) {
        return missingValueError(key);
    }

    if (typeof value !== "object") {
        return failedParseObject(key);
    }

    const valueAnyProps = value as AnyProps<PerformTransferRequest>;
    const parsedFromId = parseProp(valueAnyProps, "fromId", parseNumber);
    const parsedToId = parseProp(valueAnyProps, "toId", parseNumber);
    const parsedAmount = parseProp(valueAnyProps, "amount", parseBig);

    if (isFailedParseResult(parsedFromId) || isFailedParseResult(parsedToId) || isFailedParseResult(parsedAmount)) {
        const parseErrors = combineParseErrors(parsedFromId, parsedToId, parsedAmount);
        return failedParseProps(parseErrors, key);
    }

    const result: PerformTransferRequest = {
        fromId: parsedFromId.value,
        toId: parsedToId.value,
        amount: parsedAmount.value,
    };
    return successfulParse(result);
};
