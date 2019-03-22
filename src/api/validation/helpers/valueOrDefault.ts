// TODO [RM]: Hacky TypeScript, using `as TVal`.

export const valueOrDefault = <TOpt, TKey extends keyof TOpt, TVal extends TOpt[TKey]>(
    options: TOpt | undefined,
    key: TKey,
    defaultValue: TVal
): TVal => {
    if (!options) {
        return defaultValue;
    }

    if (options[key] === null || options[key] === undefined) {
        return defaultValue;
    }

    return options[key] as TVal;
};
