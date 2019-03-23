import { ParsePropError, ParsePropErrorType } from "../errors/ParsePropError";

export const parsePropError = (prop: string, value: any): ParsePropError => ({
    type: ParsePropErrorType,
    prop: prop,
    value: value,
});
