export const ParseObjectErrorType = Symbol("ParseObjectError");

export type ParseObjectError = {
    type: typeof ParseObjectErrorType;
};
