import { ApiSuccessfulResponse } from "@radoslaw-medryk/bank-core-models";

export const responseSuccess = <T>(data: T): ApiSuccessfulResponse<T> => ({
    data: data,
});
