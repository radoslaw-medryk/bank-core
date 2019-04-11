export const toDate = (value: string | number): Date => {
    // if (typeof value === "number") {
    //     throw new Error(`Conversion from 'number' to 'Date' not possible.`);
    // }

    // TODO [RM]: check how it handles the format, time zones, etc.
    return new Date(value);
};
