'use strict';

import WooCommerceRestApi, { WooCommerceRestApiVersion } from "@woocommerce/woocommerce-rest-api";
import { IWooCommerceAdapter, IWooCommerceConfig} from "./IWooCommerceAdapter";
const {
    URL_WOOCOOMERCE = '',
    CONSUMERKEY_WOOCOOMERCE = '',
    CONSUMERSECRET_WOOCOOMERCE = '',
    VERSION_WOOCOOMERCE = "wc/v3"
} = process.env;

class WooCommerceAdapter implements IWooCommerceAdapter{
    protected url:string;
    protected consumerKey:string;
    protected consumerSecret:string;
    protected version:WooCommerceRestApiVersion;
    protected api:WooCommerceRestApi;
    constructor() {
        this.url = URL_WOOCOOMERCE;
        this.consumerKey = CONSUMERKEY_WOOCOOMERCE;
        this.consumerSecret = CONSUMERSECRET_WOOCOOMERCE;
        this.version = <WooCommerceRestApiVersion>VERSION_WOOCOOMERCE;
        this.api = new WooCommerceRestApi({
            url: this.url,
            consumerKey: this.consumerKey,
            consumerSecret: this.consumerSecret,
            version: this.version
        });
    }

    configuration():IWooCommerceConfig{
        return { url: this.url, consumerKey:this.consumerKey, consumerSecret:this.consumerSecret, version:this.version };
    }

    get(page:number = 20):Promise<any>{
        return this.api.get("products", {
            per_page: page, // 20 products per page
        });
    }
}

export {WooCommerceAdapter}
