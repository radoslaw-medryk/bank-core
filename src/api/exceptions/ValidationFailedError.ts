import { InternalError } from "@/InternalError";
import { Validation } from "rusane";

export class ValidationFailedError extends InternalError {
    public error: Validation.ValidationError;

    constructor(error: Validation.ValidationError) {
        super();

        this.error = error;
    }
}
