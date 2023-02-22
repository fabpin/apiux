'use strict';

import {WooCommerceAdapter} from "../../providers/WooCommerce/WooCommerceAdapter";
import {ShopifyAdapter} from "../../providers/Shopify/ShopifyAdapter";
import {TEcommerceCommunication} from "./TEcommerceCommunication";
import { CompanyPrefixEnum } from "../../helpers/SystemsParameters";
import {IRequestOptions} from "../../providers/Request/IRequestAdapter";
import {Error} from "../../helpers/SystemInterface";
import {IEcommerceCommunication} from "./IEcommerceCommunication";
import {IResponseProduct, IItems, IVariants, option, ISelectionOptions} from "../../providers/IResponseProduct";

class ECommerceService implements IEcommerceCommunication{
    protected IEcommerce: TEcommerceCommunication;
    protected requestOptions:IRequestOptions;
    protected companyPrefix:string;

    constructor(companyPrefix:string,path?:string) {
        this.companyPrefix = companyPrefix;
        switch (companyPrefix){
            case CompanyPrefixEnum.WooCommerce:
                this.IEcommerce = new WooCommerceAdapter();
                break;
            case CompanyPrefixEnum.Shopify:
                path = path?path:'';
                this.IEcommerce = new ShopifyAdapter(path);
                break;
        }
    }

    async get(page?:number):Promise<IResponseProduct>{
        let error:Error = {cod:500, message:'Error general del sistema' };
        return await this.IEcommerce.get(page)
                  .then((response) => {
                        return this.transformRequest(response);
                  });
    }

    transformRequest(response:any):IResponseProduct{
        switch (this.companyPrefix){
            case CompanyPrefixEnum.Shopify:
                return {
                    succes:true,
                    message:"OK",
                    result:{
                        count: response?.data?.products.length,
                        items: response?.data?.products.map((item:IItems) => {
                            let {external_id, variants, image, options} = item,
                                product_id = options ? options[0].product_id : undefined,
                                sku = variants ? variants[0].sku : undefined,
                                imageTemp = image.src,
                                name = options ? options[0].name : undefined,
                                price = variants?variants[0].price:undefined,
                                tempOptions: Array<option>|undefined = options?.map((option: option) => {
                                    let {name, values} = option;
                                    return {name, values};
                                }),
                                tempVariant: Array<IVariants>|undefined = variants?.map((variant: IVariants) => {
                                    let {inventory_quantity} = variant;
                                    return {inventoryQuantity: inventory_quantity, legacyResourceId: "", selectedOptions:tempOptions, displayName:'', price};
                                });
                            return {external_id,product_id,sku, image:imageTemp, name, price, variants:tempVariant};
                        })
                    }
                }
            default:
                return response;
        }
    }
}

export { ECommerceService }