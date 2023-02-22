'use strict';

import {Request, Response} from "express";
import {CompanyPrefix} from "../helpers/SystemsParameters";
import {ECommerceService} from "../services/ECommerce/ECommerceService";
import {Success, Error} from "../helpers/SystemInterface";
import {CompanyPrefixEnum} from "../helpers/SystemsParameters";
import {IResponseProduct} from "../providers/IResponseProduct";
import { ProductHelper } from "../helpers/ProductHelper";
import {IProduct} from "../models/Product/IProduct";
import {DataBaseConnectionService} from "../services/DataBaseConnectionService";
import {Product} from "../models/Product/Product";
import {TProductFields} from "../models/Product/TProduct";
import { InsertResult } from "typeorm";

function searchProducts(req:Request, res:Response) {
    let companyPrefix:CompanyPrefix = req.params.companyPrefix,
        eCommerceService: ECommerceService,
        error:Error = {cod:500, message:'Error general del sistema' },
        success:Success = {cod:200, message:'Consulta exitosa', payload:{} },
        productHelper:ProductHelper,
        dataBaseConnection:DataBaseConnectionService;
    switch (companyPrefix){
        case CompanyPrefixEnum.WooCommerce:
            eCommerceService = new ECommerceService(companyPrefix);
            eCommerceService.get(20).then((product:any) => {
                success.payload = product;
                res.status(success.cod).json(success);
            }).catch((err) => {
                console.error(err);
                res.status(error.cod).json(error);
            });
            break;
        case CompanyPrefixEnum.Shopify:
            let path:string = 'products.json';
            eCommerceService = new ECommerceService(companyPrefix,path);
            eCommerceService.get().then((product:IResponseProduct) => {
                productHelper = new ProductHelper(product);
                let iProduct:IProduct[] = productHelper.transformToObjectBulk();
                dataBaseConnection = new DataBaseConnectionService(Product);
                dataBaseConnection.bulkInser(iProduct,TProductFields)
                                  .then((response:InsertResult | never[])=>{
                                      console.info('Insert product: ',response);
                                      res.status(success.cod).json(product);
                                  }).catch((err)  => {
                                      console.error(err);
                                      res.status(error.cod).json(this.error);
                                  });
            }).catch((err) => {
                console.error(err);
                res.status(error.cod).json(error);
            });
            break;
    }
}

export {searchProducts}