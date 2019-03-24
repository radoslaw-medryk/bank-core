import { router } from "@/api/server";
import { transferDbService } from "@/db/services/transferDbService";
import { transferFromDbModel } from "../models/Transfer";
import { parsePerformTransferRequest } from "../parsing/parsers/parsePerformTransferRequest";
import { isFailedParseResult } from "../parsing/ParseResult";
import { validatePerformTransferRequest } from "../validation/validators/validatePerformTransferRequest";
import { parseToApiErrors } from "../helpers/parseToApiErrors";
import { apiErrorResponse } from "../helpers/apiErrorResponse";
import { validationToApiErrors } from "../helpers/validationToApiErrors";

const r = router.prefix("/api/v1/transfers");

// TODO [RM]: validation / sanitization
// TODO [RM]: Common response envelope, error codes, etc.

r.get("/:id", async ctx => {
    const transferId = Number(ctx.params.id); // TODO [RM]: validation/sanitization

    const transferDb = await transferDbService.getTransfer(transferId);

    ctx.body = transferFromDbModel(transferDb);
});

r.post("/", async ctx => {
    // TODOc [RM]: make generic parse+validate function
    const parsedRequest = parsePerformTransferRequest(ctx.request.body);
    if (isFailedParseResult(parsedRequest)) {
        const apiErrors = parseToApiErrors(parsedRequest.error);
        ctx.body = apiErrorResponse(apiErrors);
        return;
    }

    const validationResult = validatePerformTransferRequest(parsedRequest.value, undefined);
    if (validationResult.error) {
        const apiErrors = validationToApiErrors(validationResult.error);
        ctx.body = apiErrorResponse(apiErrors);
        return;
    }

    const request = parsedRequest.value;
    const { fromId, toId, amount } = request;

    const transferId = await transferDbService.transfer(fromId, toId, amount);
    // TODO [RM]: handle business logic errors - e.g. transfer failed as well

    ctx.body = transferId;
});
