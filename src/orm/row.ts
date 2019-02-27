import { OrmRoot } from "@/orm/OrmRoot";

const orm = OrmRoot.instance;

export const row = (details?: string) => {
    const decorator: PropertyDecorator = (target, propertyKey) => {
        orm.declareRow(target, propertyKey, details);
    };
    return decorator;
};
