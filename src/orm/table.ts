import { OrmRoot } from "@/orm/OrmRoot";

const orm = OrmRoot.instance;

export const table = (name: string) => {
    const decorator: ClassDecorator = target => {
        orm.declareTable(target, name);
    };
    return decorator;
};
