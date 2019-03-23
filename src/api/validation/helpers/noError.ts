import { ValidationResult } from "../ValidationResult";

export const noError = (): ValidationResult => ({
    error: undefined,
});
