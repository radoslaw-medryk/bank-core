import { toString } from "./toString";
import { currencyCodesDb, CurrencyCodeDb } from "../models/types/CurrencyCodeDb";
import { InternalError } from "@/InternalError";

export const toCurrencyCode = (value: string | number): CurrencyCodeDb => {
    const str = toString(value);

    if (!currencyCodesDb.includes(str)) {
        throw new InternalError(`Unknown currency code '${str}'.`);
    }

    return str as CurrencyCodeDb;
};

export const toCurrencyCodeOptional = (value: string | number | null | undefined) => {
    if (value === null || value === undefined) {
        return undefined;
    }

    return toCurrencyCode(value);
};
