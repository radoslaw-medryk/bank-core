import { accountDbService } from "./services/accountDbService";

export const seedTestData = async () => {
    await accountDbService.createAccount();
    await accountDbService.createAccount();
};
