import { table, column } from "declaro";

export type UserId = number;

export const Users = "Users";

@table(Users)
export class User {
    @column({ type: "serial", primaryKey: true })
    public id?: UserId = 0;

    @column({ type: "varchar(64)", notNull: true })
    public name: string = "";
}
