'use strict';

import {Request, Response} from "express";
import {DataBaseConnectionService} from "../services/DataBaseConnectionService";
import {Product} from "../models/Product/Product";
import { ObjectLiteral } from "typeorm";
import {Success, Error} from "../helpers/SystemInterface";
import {ProductHelper} from "../helpers/ProductHelper";
import { IResponseProduct } from "../providers/IResponseProduct";

async function getProducts(req:Request, res:Response) {
    let dataBaseConnection:DataBaseConnectionService = new DataBaseConnectionService(Product),
        error:Error = {cod:500, message:'Error general del sistema' },
        success:Success = {cod:200, message:'Consulta exitosa', payload:{} },
        productHelper:ProductHelper = new ProductHelper();
        dataBaseConnection.pagination('products', 'product_id',0,10)
                  .then((products:ObjectLiteral[])=> {
                      let tempProducts: IResponseProduct = productHelper.transformRequestFromProduct(products);
                      success.payload = products;
                      res.status(success.cod).json(tempProducts);
                  })
                  .catch((err)  => {
                      console.error(err);
                      res.status(error.cod).json(this.error);
                  });
}

export {getProducts}