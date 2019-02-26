import { table } from "@/orm/table";
import { row } from "@/orm/row";

export const Accounts = "Accounts";

@table(Accounts)
export class Account {
    @row("serial PRIMARY KEY")
    public id?: number = undefined;

    @row("number NOT NULL")
    public balance?: number = undefined;
}
