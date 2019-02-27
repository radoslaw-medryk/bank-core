import { OrmRoot } from "@/orm/OrmRoot";

// require("@/models/Account");
require("@/models/UserAccount");

const orm = OrmRoot.instance;
console.log(orm.declarations);
