import { SqlxQuery, sqlxQuerySymbol } from "slonix";

export const isSqlxQuery = (value: any): value is SqlxQuery => {
    return value && value.type === sqlxQuerySymbol;
};
