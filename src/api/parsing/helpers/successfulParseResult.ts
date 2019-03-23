import { SuccessfulParseResult } from "../ParseResult";

export const successfulParseResult = <T>(value: T): SuccessfulParseResult<T> => ({
    value: value,
});
