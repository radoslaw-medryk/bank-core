import { ParseResult } from "../ParseResult";
import { ParseFunc } from "../ParseFunc";

export const parseProp = <TObj, TKey extends Extract<keyof TObj, string>, TVal>(
    obj: TObj,
    prop: TKey,
    parseFunc: ParseFunc<TVal>
): ParseResult<TVal> => {
    const value = obj[prop];
    return parseFunc(value, prop);
};
