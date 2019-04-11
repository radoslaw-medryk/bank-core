import { InternalError } from "@/InternalError";
import { Parsing } from "rusane";

export class ParsingFailedError extends InternalError {
    public error: Parsing.ParseError;

    constructor(error: Parsing.ParseError) {
        super();

        this.error = error;
    }
}
