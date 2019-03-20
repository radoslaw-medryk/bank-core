import Decimal from "decimal.js";
import { QueryResultRowColumnType } from "slonik";

export const toDecimal = (value: QueryResultRowColumnType): Decimal => {
    if (typeof value === "number") {
        throw new Error(`Possible lost precision; Provided value is number = '${value}'.`);
    }

    return new Decimal(value);
};
