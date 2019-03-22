import { valueOrDefault } from "../helpers/valueOrDefault";

export type IsValueMissingOptions = {
    emptyStringIsError?: boolean;
};

const processOptions = (options: IsValueMissingOptions | undefined): Required<IsValueMissingOptions> => ({
    emptyStringIsError: valueOrDefault(options, "emptyStringIsError", true),
});

export const isValueMissing = (value: any, options?: IsValueMissingOptions): boolean => {
    const processedOptions = processOptions(options);

    if (processedOptions.emptyStringIsError && value === "") {
        return true;
    }

    return [null, undefined].includes(value);
};
