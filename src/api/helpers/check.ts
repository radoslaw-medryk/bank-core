import { Parsing, Validation } from "rusane";
import { ParsingFailedError } from "../exceptions/ParsingFailedError";
import { ValidationFailedError } from "../exceptions/ValidationFailedError";

export const check = <TParsed>(
    object: any,
    propName: string,
    parseFunc: Parsing.ParseFunc<TParsed>,
    ...validateFuncArray: Validation.ValidationFunc<TParsed>[]
): TParsed => {
    const value = object[propName];

    const parsed = parseFunc(value, propName);
    if (Parsing.isFailedParseResult(parsed)) {
        throw new ParsingFailedError(parsed.error);
    }

    const validated = Validation.chainValidators(parsed.value, propName, ...validateFuncArray);
    if (validated.error) {
        throw new ValidationFailedError(validated.error);
    }

    return parsed.value;
};
