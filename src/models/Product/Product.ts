import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm"

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn({type:"bigint"})
    id: number

    @Column({nullable: true, type:"bigint"})
    product_id: string

    @Column({nullable: true, type:"bigint"})
    parent_id: string

    @Column({ nullable: true,default: false })
    init: boolean

    @Column({nullable: true})
    external_id: string

    @Column({nullable: true})
    search_text:string

    @Column({nullable: true})
    name: string

    @Column({nullable: true})
    price: number

    @Column({nullable: true})
    image: string

    @Column('jsonb', { nullable: false, default: {} })
    json_product: string

    @Column({nullable: true})
    sku: string

    @Column({nullable: true})
    store_product_id: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
