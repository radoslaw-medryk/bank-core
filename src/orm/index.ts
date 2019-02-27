require("@/models/Account");

import { OrmRoot } from "@/orm/OrmRoot";

const orm = OrmRoot.instance;
console.log(orm.declarations);
