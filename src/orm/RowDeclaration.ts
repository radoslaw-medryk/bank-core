export class RowDeclaration {
    public readonly name: string;
    public readonly details?: string;

    constructor(name: string, details?: string) {
        this.name = name;
        this.details = details;
    }
}
