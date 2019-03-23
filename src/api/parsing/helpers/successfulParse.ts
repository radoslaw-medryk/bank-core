import { SuccessfulParseResult, SuccessfulParseResultType } from "../ParseResult";

export const successfulParse = <T>(value: T): SuccessfulParseResult<T> => ({
    type: SuccessfulParseResultType,
    value: value,
});
