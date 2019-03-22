import { ValidationError } from "./errors/ValidationError";

export type ValidationResult = {
    errors: ValidationError[];
};
