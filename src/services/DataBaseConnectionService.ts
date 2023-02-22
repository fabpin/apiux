'use strict';

import {TypeormAdapter} from "../providers/TypeORM/TypeormAdapter";
import {EntityTarget, ObjectLiteral} from "typeorm";
import {IProduct} from "../models/Product/IProduct";

export class DataBaseConnectionService {
    protected typeormAdapter:TypeormAdapter;
    constructor(model: EntityTarget<ObjectLiteral>) {
        this.typeormAdapter = new TypeormAdapter(model);
    }

    async pagination(nameTable: string, orderColumn: string, skip?: number, take?: number): Promise<void | ObjectLiteral[]> {
        return await this.typeormAdapter.pagination(nameTable, orderColumn,skip,take);
    }

    async bulkInser(bulkInsert:IProduct[], fieldToUpdateForConflict:Array<string>){
        return await this.typeormAdapter.insertBulkOrUpdate(bulkInsert, fieldToUpdateForConflict);
    }

}