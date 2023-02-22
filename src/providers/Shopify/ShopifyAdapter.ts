'use strict';

import {IShopifyAdapter} from "./IShopifyAdapter";
import {IShopifyConfig} from "./IShopifyAdapter";
import axios from "axios";
const {APIKEY_SHOPIFY = '', PASSWORD_SHOPIFY = '', HOSTNAME_SHOPIFY = '', VERSION_SHOPIFY = ''} = process.env;

class ShopifyAdapter implements IShopifyAdapter{
    protected apiKey:string;
    protected password:string;
    protected hostname:string;
    protected version:string;
    protected hostNameSet:string;
    protected path:string;

    constructor(path:string) {
        this.apiKey = APIKEY_SHOPIFY;
        this.password = PASSWORD_SHOPIFY;
        this.hostname = HOSTNAME_SHOPIFY;
        this.version = VERSION_SHOPIFY;
        this.path = '/admin/api/'+this.version+'/'+path;
        this.hostNameSet = 'https://'+this.apiKey+':'+this.password+'@'+this.hostname+'.myshopify.com';
        axios.defaults.baseURL = this.hostNameSet;
        axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
    }

    get():Promise<any>{
        return axios.get(this.path);
    }

    configuration():IShopifyConfig{
        return {apiKey:this.apiKey, password:this.password, hostname:this.hostname, version:this.version};
    }
}

export { ShopifyAdapter }