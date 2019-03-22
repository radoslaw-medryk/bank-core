import Big from "big.js";

export const toBig = (value: string | number): Big => {
    if (typeof value === "number") {
        throw new Error(`Possible lost precision; Provided value is number = '${value}'.`);
    }

    return new Big(value);
};
