import { table, column } from "declaro";

export const Users = "Users";

@table(Users)
export class User {
    @column({ type: "serial", primaryKey: true })
    public id?: number = 0;

    @column({ type: "varchar(64)", notNull: true })
    public name: string = "";
}
