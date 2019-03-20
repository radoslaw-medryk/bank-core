import { QueryResultRowColumnType } from "slonik";

export const toString = (value: QueryResultRowColumnType): string => {
    if (typeof value === "string") {
        return value;
    }

    return value.toString();
};
