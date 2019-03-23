import { ValidationError } from "./errors/ValidationError";

export type ValidationResult = {
    error: ValidationError | undefined;
};
