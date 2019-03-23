import { ParseResult } from "./ParseResult";

export type ParseFunc<T> = (value: any, key?: string) => ParseResult<T>;
