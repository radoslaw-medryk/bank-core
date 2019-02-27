import { RowDeclaration } from "./RowDeclaration";
import { ClassConstructor } from "./primitives";

export class TableDeclaration {
    public classConstructor: ClassConstructor;
    public name?: string;
    public rows: RowDeclaration[] = [];
    public details?: string;

    constructor(classConstructor: ClassConstructor) {
        this.classConstructor = classConstructor;
    }

    public addRow = (name: string, details?: string) => {
        this.rows = [
            ...this.rows,
            new RowDeclaration(name, details),
        ];
    }

    public setName = (name: string) => {
        this.name = name;
    }

    public setDetails = (details: string) => {
        this.details = details;
    }
}
