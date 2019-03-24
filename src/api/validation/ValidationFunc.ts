import { ValidationResult } from "./ValidationResult";

export type ValidationFunc<TVal, TRule> = (value: TVal, rule: TRule, key?: string) => ValidationResult;
