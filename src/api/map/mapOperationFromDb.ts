import { ApiTransaction, ApiTransactionCategory } from "@radoslaw-medryk/bank-core-shared";
import { OperationDb } from "@/db/models/OperationDb";
import { mapBigFromDb } from "./mapBigFromDb";
import { mapDateFromDb } from "./mapDateFromDb";

// TODO [RM]: contains dummy/test data partially for now

export const mapOperationFromDb = (dbOperation: OperationDb): ApiTransaction => {
    return {
        id: dbOperation.id,
        category: (dbOperation.category as ApiTransactionCategory) || "food", // TODO [RM]: default value for test only, change later
        title: dbOperation.title || "", // TODO [RM]: default value for test only, change later
        date: mapDateFromDb(dbOperation.date),
        value: {
            currencyCode: "usd", // TODO [RM]: dummy data
            value: mapBigFromDb(dbOperation.amount),
        },
    };
};
