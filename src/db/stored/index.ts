import requireDir = require("require-dir");
import { SqlxQuery } from "slonix";
import { isSqlxQuery } from "../helpers/isSqlxQuery";
import { InternalError } from "@/InternalError";

const importedCreateSqls = Object.values(requireDir("./", { recurse: true })).map(q => q.createSql);

if (importedCreateSqls.some(q => !isSqlxQuery(q))) {
    throw new InternalError("Some of imported stored ' createSql' values are nor SqlxQuery.");
}

export const storedCreateSqls = importedCreateSqls as SqlxQuery[];
