import { getPropsValueMissingKeys } from "../validation/checks/getPropsValueMissingKeys";
import { missingValueError } from "../validation/errors/MissingValueError";

export const getPropsValueMissingErrors = <TObj, TKey extends Extract<keyof TObj, string>>(
    obj: TObj,
    requiredProps: Array<TKey>
) => {
    const missingProps = getPropsValueMissingKeys(obj, requiredProps);
    return missingProps.map(key => missingValueError(key, obj[key]));
};
