import { sqlx } from "slonix";
import { Big } from "big.js";
import moment from "moment";

sqlx.registerProcessor({
    predicate: value => value instanceof Big,
    process: value => ({
        value: value.toString(),
        escapeString: false,
        wrapString: false,
    }),
});

sqlx.registerProcessor({
    predicate: value => value instanceof Date,
    process: value => ({
        value: moment(value).format(), // TODO [RM]: handle timezone, etc.
        escapeString: false,
        wrapString: true,
    }),
});
