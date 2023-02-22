export interface IProduct{
    product_id?: string,
    parent_id?: string,
    init?: boolean,
    external_id?: string,
    search_text?:string,
    name?: string,
    price?: number,
    image?: string,
    json_product?: object|object[],
    sku?: string,
    store_product_id?: string,
    created_at?: Date,
    updated_at?: Date
}