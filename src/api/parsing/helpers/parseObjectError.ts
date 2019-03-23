import { ParseObjectError, ParseObjectErrorType } from "../errors/ParseObjectError";

export const parseObjectError = (): ParseObjectError => ({
    type: ParseObjectErrorType,
});
