import { TableDeclaration } from "@/orm/TableDeclaration";
import { ClassConstructor } from "./primitives";

export class OrmRoot {
    public static readonly instance: OrmRoot = new OrmRoot();

    public declarations: TableDeclaration[] = [];

    public declareTable = (classConstructor: ClassConstructor, name: string) => {
        const table = this.findTable(classConstructor);

        // TODO [RM]: handle duplicated declarations for the same table

        if (table) {
            table.setName(name);
        } else {
            this.addTable(classConstructor, name);
        }
    }

    public declareRow = (target: object, propertyKey: string | symbol, details?: string) => {
        const rowName = propertyKey as string; // TODO [RM]: handle symbol type here

        const classConstructor = target.constructor;
        const table = this.findTable(classConstructor);

        // TODO [RM]: handle duplicated declarations for the same property or property name duplicates

        if (table) {
            table.addRow(rowName, details);
        } else {
            this.addTableWithRow(classConstructor, rowName, details);
        }
    }

    private findTable = (classConstructor: ClassConstructor): TableDeclaration | undefined => {
        return this.declarations
            .filter(q => q.classConstructor === classConstructor)
            [0];
    }

    private addTable = (classConstructor: ClassConstructor, tableName: string) => {
        const newTable = new TableDeclaration(classConstructor);
        newTable.setName(tableName);

        this.declarations = [
            ...this.declarations,
            newTable,
        ];
    }

    private addTableWithRow = (classConstructor: ClassConstructor, rowName: string, details?: string) => {
        const newTable = new TableDeclaration(classConstructor);
        newTable.addRow(rowName, details);

        this.declarations = [
            ...this.declarations,
            newTable,
        ];
    }
}
