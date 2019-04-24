import Big from "big.js";

export const mapBigFromDb = (value: Big): string => {
    return value.toFixed();
};
