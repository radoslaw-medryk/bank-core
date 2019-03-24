export class InternalError extends Error {
    public innerError?: Error;

    constructor(message?: string, innerError?: Error) {
        super(message);
        this.innerError = innerError;
    }
}
