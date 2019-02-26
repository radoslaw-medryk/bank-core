import { table } from "@/orm/table";
import { row } from "@/orm/row";

export const Users = "Users";

@table(Users)
export class User {
    @row("serial PRIMARY KEY")
    public id?: number = undefined;

    @row("varchar(64) NOT NULL")
    public name?: string = undefined;
}
