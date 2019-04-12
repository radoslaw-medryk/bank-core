import { ApiSuccessfulResponse } from "@radoslaw-medryk/bank-core-shared";

export const responseSuccess = <T>(data: T): ApiSuccessfulResponse<T> => ({
    data: data,
});
