import { SqlxQuery, sqlx } from "slonix";
import { sql, IdentifierTokenType, ValueExpressionType } from "slonik";
import { isSqlxQuery } from "./isSqlxQuery";

export type StoredFunctionLanguage = "sql" | "plpgsql";

type ReturnsType = string | SqlxQuery;

export type StoredFunctionConfig = {
    name: IdentifierTokenType;
    language: StoredFunctionLanguage;
    params: string[];
    returns?: ReturnsType;
};

const processReturns = (value: ReturnsType | undefined): ValueExpressionType | undefined => {
    if (!value) {
        return undefined;
    }

    if (isSqlxQuery(value)) {
        return value;
    }

    return sql.raw(value);
};

export const storedFunction = (config: StoredFunctionConfig) => (
    template: TemplateStringsArray,
    ...values: any[]
): SqlxQuery => {
    const _name = config.name;
    const _params = sql.raw(config.params.join(", "));
    const _returns = processReturns(config.returns);
    const _language = sql.raw(config.language);

    return sqlx`
        DROP FUNCTION IF EXISTS ${_name};
        CREATE FUNCTION
        ${_name} (${_params})
        ${sql.raw(_returns ? "RETURNS " : "")}${_returns || sql.raw("")}
        AS $function_body$
        ${sqlx(template, ...values)}
        $function_body$ LANGUAGE ${_language};
    `;
};
