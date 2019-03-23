import { router } from "@/api/server";
import { PerformTransferRequest } from "../models/PerformTransferRequest";
import { transferDbService } from "@/db/services/transferDbService";
import { transferFromDbModel } from "../models/Transfer";
import { parsePerformTransferRequest } from "../parsing/parsers/parsePerformTransferRequest";
import { isFailedParseResult } from "../parsing/ParseResult";
import { validatePerformTransferRequest } from "../validation/validators/validatePerformTransferRequest";

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
        ctx.body = { errorType: "parsing", error: parsedRequest.error }; // TODO [RM]: temp only, for tests
        return;
    }

    const validationResult = validatePerformTransferRequest(parsedRequest.value);
    if (validationResult.error) {
        ctx.body = { errorType: "validation", error: validationResult.error }; // TODO [RM]: temp only, for tests
        return;
    }

    const request = parsedRequest.value;
    const { fromId, toId, amount } = request;

    const transferId = await transferDbService.transfer(fromId, toId, amount);
    // TODO [RM]: handle business logic errors - e.g. transfer failed as well

    ctx.body = transferId;
});
