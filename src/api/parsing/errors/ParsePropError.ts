export const ParsePropErrorType = Symbol("ParsePropError");

export type ParsePropError = {
    type: typeof ParsePropErrorType;
    prop: string;
    value: any;
};
