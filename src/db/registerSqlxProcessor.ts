import { sqlx } from "slonix";
import { Big } from "big.js";

sqlx.registerProcessor({
    predicate: value => value instanceof Big,
    process: value => ({
        value: value.toString(),
        escapeString: false,
        wrapString: false,
    }),
});
