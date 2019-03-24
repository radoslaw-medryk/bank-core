export const toNumber = (value: string | number): number => {
    if (typeof value === "number") {
        return value;
    }

    const result = Number(value);
    if (!Number.isFinite(result) || Math.round(result) !== result) {
        throw new Error(`Provided value is not valid, finite integer '${value}'.`);
    }

    return result;
};
