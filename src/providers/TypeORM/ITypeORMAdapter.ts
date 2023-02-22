import {EntityTarget, ObjectLiteral} from "typeorm";

export interface ITypeORMAdapter{
    pagination: (nameTable: string, orderColumn: string, skip?: number, take?: number) => Promise<ObjectLiteral[] | never[]>,
    model: EntityTarget<ObjectLiteral>
}