export interface IShopifyConfig{
    apiKey:string, password:string, hostname:string, version:string
}

export interface IShopifyAdapter{
    get():Promise<any>,
    configuration():IShopifyConfig
}