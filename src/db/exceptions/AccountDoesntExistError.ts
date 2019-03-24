import { InternalError } from "@/InternalError";

export class AccountDoesntExistsError extends InternalError {
    constructor(message?: string, innerError?: Error) {
        super(message, innerError);
    }
}
