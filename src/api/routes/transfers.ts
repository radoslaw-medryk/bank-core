import { router } from "@/api/server";
import { transferDbService } from "@/db/services/transferDbService";
import { transferFromDbModel } from "../models/Transfer";
import { apiErrorResponse } from "../helpers/apiErrorResponse";
import { checkPerformTransferRequest } from "../checks/checkPerformTransferRequest";

const r = router.prefix("/api/v1/transfers");

// TODO [RM]: validation / sanitization
// TODO [RM]: Common response envelope, error codes, etc.

r.get("/:id", async ctx => {
    const transferId = Number(ctx.params.id); // TODO [RM]: validation/sanitization

    const transferDb = await transferDbService.getTransfer(transferId);

    ctx.body = transferFromDbModel(transferDb);
});

r.post("/", async ctx => {
    const parsedAndValidated = checkPerformTransferRequest(ctx.request.body);
    if (parsedAndValidated.errors) {
        ctx.body = apiErrorResponse(parsedAndValidated.errors);
        return;
    }

    const request = parsedAndValidated.value;
    const { fromId, toId, amount } = request;

    const transferId = await transferDbService.transfer(fromId, toId, amount);
    // TODO [RM]: handle business logic errors - e.g. transfer failed as well

    ctx.body = transferId;
});
