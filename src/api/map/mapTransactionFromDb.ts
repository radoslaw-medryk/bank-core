import { TransferDb } from "@/db/models/TransferDb";
import { ApiTransaction } from "@radoslaw-medryk/bank-core-models";

// TODO [RM]: contains dummy/test data partially for now

export const mapTransactionFromDb = (dbTransfer: TransferDb): ApiTransaction => {
    return {
        id: dbTransfer.id,
        category: "food",
        title: "test title",
        date: dbTransfer.date,
        value: {
            currencyCode: "usd",
            value: dbTransfer.amount,
        },
    };
};
