import { ValidationResult } from "./ValidationResult";

export type ValidationFunc<T> = (value: T, key?: string) => ValidationResult;
