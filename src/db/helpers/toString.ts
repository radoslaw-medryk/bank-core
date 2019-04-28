export const toString = (value: string | number): string => {
    if (typeof value === "string") {
        return value;
    }

    return value.toString();
};

export const toStringOptional = (value: string | number | null | undefined) => {
    if (value === null || value === undefined) {
        return undefined;
    }

    return toString(value);
};
