import { ValidationFunc } from "../ValidationFunc";
import { ValidationResult } from "../ValidationResult";

export const validateProp = <TObj, TKey extends Extract<keyof TObj, string>, TRule>(
    obj: TObj,
    prop: TKey,
    validationFunc: ValidationFunc<TObj[TKey], TRule>,
    rule: TRule
): ValidationResult => {
    const value = obj[prop];
    return validationFunc(value, rule, prop);
};
