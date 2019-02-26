import handler from "express-async-handler";
import { db } from "src/db";

export const _default = handler(async (req, res) => {
    db()
});
