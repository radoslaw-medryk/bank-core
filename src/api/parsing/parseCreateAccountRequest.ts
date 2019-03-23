import { ParseResult } from "./ParseResult";
import { parseObjectError } from "./helpers/parseObjectError";
import { failedParseResult } from "./helpers/failedParseResult";
import { successfulParseResult } from "./helpers/successfulParseResult";
import { CreateAccountRequest } from "../models/CreateAccountRequest";

export const parseCreateAccountRequest = (value: any): ParseResult<CreateAccountRequest> => {
    if (value === null || value === undefined) {
        return failedParseResult(parseObjectError());
    }

    if (typeof value !== "object") {
        return failedParseResult(parseObjectError());
    }

    const parsed: CreateAccountRequest = {
        //
    };

    return successfulParseResult(parsed);
};
