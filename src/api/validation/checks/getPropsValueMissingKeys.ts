import { IsValueMissingOptions, isValueMissing } from "./isValueMissing";

export const getPropsValueMissingKeys = <TObj, TKey extends keyof TObj>(
    obj: TObj,
    props: Array<TKey>,
    options?: IsValueMissingOptions
): Array<TKey> => {
    return props.filter(key => isValueMissing(obj[key], options));
};
