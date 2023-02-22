import {WooCommerceRestApiVersion} from "@woocommerce/woocommerce-rest-api";

export interface IWooCommerceConfig{
    url:string,
    consumerKey:string,
    consumerSecret:string,
    version:string
}

export interface IWooCommerceAdapter {
    configuration(): IWooCommerceConfig,
    get(): Promise<any>
}