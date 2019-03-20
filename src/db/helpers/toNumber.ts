import { QueryResultRowColumnType } from "slonik";

export const toNumber = (value: QueryResultRowColumnType): number => {
    if (typeof value === "number") {
        return value;
    }

    const result = Number(value);
    if (!Number.isFinite(result) || Math.round(result) !== result) {
        throw new Error(`Provided value is not valid, finite integer '${value}'.`);
    }

    return result;
};
