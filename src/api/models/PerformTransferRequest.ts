import { AccountId } from "./Account";
import Big from "big.js";

export type PerformTransferRequest = {
    fromId: AccountId;
    toId: AccountId;
    amount: Big;
};
