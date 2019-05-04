import * as Account from "./AccountDb";
import * as Operation from "./OperationDb";
import * as OperationTransfer from "./OperationTransferDb";
import * as Transfer from "./TransferDb";
import * as UserAccount from "./UserAccountDb";
import * as User from "./UserDb";
import * as Friend from "./FriendDb";

export const modelCreateSqls = [
    Account.createSql,
    User.createSql,
    UserAccount.createSql,
    Transfer.createSql,
    Operation.createSql,
    OperationTransfer.createSql,
    Friend.createSql,
];
