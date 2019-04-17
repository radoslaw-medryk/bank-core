import { InternalError } from "@/InternalError";

export const toBoolean = (value: boolean | string | number): boolean => {
    if (typeof value !== "boolean") {
        throw new InternalError(`Unsupported type '${typeof value}'.`);
    }

    return value;
};
