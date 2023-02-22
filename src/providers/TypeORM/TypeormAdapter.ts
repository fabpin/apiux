'use strict';

import {DataSource, EntityTarget, ObjectLiteral} from "typeorm";
import {AppDataSource} from "../../data-source";
import {ITypeORMAdapter} from "./ITypeORMAdapter";
import {TModels} from "../../models/TModels";
import {IProduct} from "../../models/Product/IProduct";

class TypeormAdapter implements ITypeORMAdapter{
    protected _model:EntityTarget<ObjectLiteral>;
    constructor(model:EntityTarget<ObjectLiteral>) {
        this._model = model;
    }

    async pagination(nameTable:string,orderColumn:string, skip:number=0, take:number=10){
            return await AppDataSource.then(async (dataSource:DataSource) =>{
                return await dataSource
                    .getRepository(this.model)
                    .createQueryBuilder(nameTable)
                    .orderBy(nameTable+'.'+orderColumn, "DESC")
                    .take(take)
                    .skip(skip)
                    .getMany();
            }).catch((error) => {
                console.error(error);
                return [];
            });
    }

    async insertBulkOrUpdate(bulkInsert:IProduct[], fieldToUpdateForConflict:Array<string>){
        return await AppDataSource.then(async (dataSource:DataSource) =>{
            return await dataSource
                .getRepository(this.model)
                .createQueryBuilder()
                .insert()
                .into(this.model)
                .values(bulkInsert)
                .execute();
        }).catch((error) => {
            console.error(error);
            return [];
        });
    }

    get model(){
        return this._model;
    }
}

export { TypeormAdapter }