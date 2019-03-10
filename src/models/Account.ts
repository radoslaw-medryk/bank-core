import { table, column } from "declaro";

export type AccountId = number;

export const Accounts = "Accounts";

@table(Accounts)
export class Account {
    @column({ type: "serial", primaryKey: true })
    public id?: AccountId = 0;

    @column({ type: "numeric", notNull: true })
    public balance: number | string = 0;
}
