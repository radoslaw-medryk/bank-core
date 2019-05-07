import { UserDbId } from "@/db/models/UserDb";
import { dbDataInitializer } from "@/db/seedInitData";
import { friendDbService } from "@/db/services/friendDbService";
import { accountDbService } from "@/db/services/accountDbService";
import { operationDbService } from "@/db/services/operationDbService";
import { mockTransferName, mockCategory } from "@/helpers/mock";
import { sqlx } from "slonix";
import { pool } from "@/db";
import Big from "big.js";
import { OperationDb, OperationDbId } from "@/db/models/OperationDb";

export const initNewUserDummyData = async (userId: UserDbId) => {
    // TODO [RM]: dummy data, for test purposes only:

    const { bankAccountIds, predefinedFriendIds } = await dbDataInitializer.getInitData();

    for (let i = 0; i < predefinedFriendIds.length; i++) {
        await friendDbService.makeFriend(userId, predefinedFriendIds[i]);
    }

    const accountUsdId = await accountDbService.createUserAccount(userId, "usd");
    const accountCnyId = await accountDbService.createUserAccount(userId, "cny");
    const accountPlnId = await accountDbService.createUserAccount(userId, "pln");

    const bankAccountUsdId = bankAccountIds["usd"]!;
    const bankAccountCnyId = bankAccountIds["cny"]!;
    const bankAccountPlnId = bankAccountIds["pln"]!;

    await operationDbService.performTransfer(bankAccountCnyId, accountCnyId, new Big("10000"), "Top Up", "topup");

    let operationIdsToUpdate: OperationDbId[] = [];

    const [, topupOperationToId] = await operationDbService.performTransfer(
        bankAccountUsdId,
        accountUsdId,
        new Big("100000"),
        "Top Up",
        "topup"
    );

    operationIdsToUpdate = [...operationIdsToUpdate, topupOperationToId];

    for (let i = 0; i < 40; i++) {
        const amount = Math.floor(Math.random() * 2500 * 100) / 100;
        const title = mockTransferName();
        const category = mockCategory();

        const [operationFromId] = await operationDbService.performTransfer(
            accountUsdId,
            bankAccountUsdId,
            new Big(amount),
            title,
            category
        );

        operationIdsToUpdate = [...operationIdsToUpdate, operationFromId];
    }

    let date = new Date();
    for (const operationId of operationIdsToUpdate.reverse()) {
        const newDate = new Date(date.getTime());
        newDate.setMinutes(newDate.getMinutes() - Math.floor(Math.random() * 360));
        date = newDate;

        await sqlx.any(
            pool,
            sqlx`
            UPDATE ${OperationDb.table}
            SET ${OperationDb.props.date} = ${date}
            WHERE ${OperationDb.props.id} = ${operationId};`
        );
    }
};
