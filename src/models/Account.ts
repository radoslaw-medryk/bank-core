import { table, column } from "declaro";

export const Accounts = "Accounts";

@table(Accounts)
export class Account {
    @column({ type: "serial", primaryKey: true })
    public id?: number = 0;

    @column({ type: "numeric", notNull: true })
    public balance: number = 0;
}
