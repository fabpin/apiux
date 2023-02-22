'use strict';
import { MigrationInterface, QueryRunner, Table, TableIndex, TableColumn, TableForeignKey} from "typeorm"

export class products1676819410215 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "products",
                columns: [
                    {
                        name: "id",
                        type: "bigint",
                        isPrimary: true,
                    },
                    {
                        name: "product_id",
                        type: "bigint",
                        isNullable: true
                    },
                    {
                        name: "parent_id",
                        type: "bigint",
                        isNullable: true
                    },
                    {
                        name: "init",
                        type: "boolean",
                        isNullable: true
                    },
                    {
                        name: "external_id",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "search_text",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "price",
                        type: "int",
                        isNullable: true
                    },
                    {
                        name: "image",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "json_product",
                        type: "jsonb",
                    },
                    {
                        name: "sku",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "store_product_id",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "short_description",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "long_description",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                    },
                ],
            }),
            true,
        )

        await queryRunner.createIndex(
            "products",
            new TableIndex({
                name: "search_text_find",
                columnNames: ["search_text"],
            }),
        )

        await queryRunner.createIndex(
            "products",
            new TableIndex({
                name: "parent_id_find",
                columnNames: ["parent_id"],
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
