'use strict';

import {IProduct} from "../models/Product/IProduct";
import {IItems, IResponseProduct, IVariants, option} from "../providers/IResponseProduct";
import {ObjectLiteral} from "typeorm";

class ProductHelper{
    protected response:IResponseProduct|undefined;
    constructor(response?:IResponseProduct) {
        this.response = response;
    }

     transformToObjectBulk():Array<IProduct>{
        if(this.response){
            return this.response.result.items.map((item:IItems) => {
                let { external_id,product_id, sku, image, name, short_description, long_description, price, variants } = item;
                return {
                    product_id: product_id,
                    parent_id:undefined,
                    init:false,
                    external_id:external_id,
                    search_text:undefined,
                    name:name,
                    price:price?parseInt(price):undefined,
                    image:image,
                    json_product:variants,
                    sku:sku,
                    store_product_id: undefined
                };
            });
        }else{
            return [];
        }
    }

    transformRequestFromProduct(products:ObjectLiteral[]):IResponseProduct{
        return {
            succes:true,
            message:"OK",
            result:{
                count: products?.length,
                items: products.map((item:IProduct) => {
                    let {
                        product_id,
                        parent_id,
                        init,
                        external_id,
                        search_text,
                        name,
                        price,
                        image,
                        json_product,
                        sku,
                        store_product_id,
                        created_at,
                        updated_at} = item;
                    return {
                        external_id,
                        product_id,
                        sku,
                        image,
                        name,
                        price:price?price.toString():'',
                        short_description:'',
                        long_description:'',
                        variants:<Array<IVariants>>json_product};
                })
            }
        }

    }
}

export { ProductHelper }