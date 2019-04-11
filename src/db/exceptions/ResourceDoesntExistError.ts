import { InternalError } from "@/InternalError";

export class ResourceDoesntExistsError extends InternalError {
    public resourceName?: string;
    public resourceId?: number | string;

    constructor(resourceName?: string, resourceId?: number | string, message?: string, innerError?: Error) {
        super(message, innerError);

        this.resourceName = resourceName;
        this.resourceId = resourceId;
    }
}
