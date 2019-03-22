import { router } from "@/api/server";
import { PerformTransferRequest } from "../models/PerformTransferRequest";
import { transferDbService } from "@/db/services/transferDbService";
import { transferFromDbModel } from "../models/Transfer";

const r = router.prefix("/api/v1/transfers");

// TODO [RM]: validation / sanitization
// TODO [RM]: Common response envelope, error codes, etc.

r.get("/:id", async ctx => {
    const transferId = Number(ctx.params.id); // TODO [RM]: validation/sanitization

    const transferDb = await transferDbService.getTransfer(transferId);

    ctx.body = transferFromDbModel(transferDb);
});

r.post("/", async ctx => {
    // TODO [RM]: PerformTransferRequest
    const request: PerformTransferRequest = ctx.request.body; // TODO [RM]: validation/sanitization
    const { fromId, toId, amount } = request;

    const transferId = await transferDbService.transfer(fromId, toId, amount);

    ctx.body = transferId;
});
