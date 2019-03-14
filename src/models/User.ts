import { propsDefinition, tableDefinition } from "slonix";
import { sql } from "slonik";

export type UserId = number;

export class User {
    public id: UserId = 0;
    public name: string | null = null;

    public static table = tableDefinition("Users");
    public static props = propsDefinition(User);
}

const t = User.table;
const p = User.props;

export const createSql = sql`
    DROP TABLE IF EXISTS ${t} CASCADE;
    CREATE TABLE ${t} (
        ${p.id} serial PRIMARY KEY,
        ${p.name} varchar(64) NULL
    );
`;
