import { ApiCurrencyCode, apiCurrencyCodes } from "@radoslaw-medryk/bank-core-shared";
import { InternalError } from "@/InternalError";

export const mapCurrencyFromDb = (value: string): ApiCurrencyCode => {
    if (!apiCurrencyCodes.includes(value)) {
        throw new InternalError(`Unknown currency code '${value}'.`);
    }

    return value as ApiCurrencyCode;
};
