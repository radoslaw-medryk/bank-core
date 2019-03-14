import { accountDbService } from "@/dbServices/accountDbService";

export const seedTestData = async () => {
    await accountDbService.createAccount();
    await accountDbService.createAccount();
};
