import { SqlxQuery, sqlx } from "slonix";
import { sql } from "slonik";

export type StoredFunctionConfig = {
    name: string;
    params: string[];
    returns?: string;
};

export const storedFunction = (config: StoredFunctionConfig) => (
    template: TemplateStringsArray,
    ...values: any[]
): SqlxQuery => {
    const _name = sql.identifier([config.name]);
    const _params = sql.raw(config.params.join(", "));
    const _returns = sql.raw(config.returns ? `RETURNS ${config.returns}` : "");

    return sqlx`
        CREATE OR REPLACE FUNCTION
        ${_name} (${_params})
        ${_returns} 
        AS $$
        BEGIN
            ${sqlx(template, ...values)}
        END;
        $$ LANGUAGE plpgsql;
    `;
};
