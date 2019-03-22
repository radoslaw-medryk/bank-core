import { IsValueMissingOptions, isValueMissing } from "./isValueMissing";

export const getPropsValueMissing = <TObj>(
    obj: TObj,
    props: Array<keyof TObj>,
    options?: IsValueMissingOptions
): Array<keyof TObj> => {
    return props.filter(key => isValueMissing(obj[key], options));
};
