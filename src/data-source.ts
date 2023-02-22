import "reflect-metadata"
import { DataSource } from "typeorm";
import {ConfigDataBase} from "./config/database";
import {Product} from "./models/Product/Product";

let configDataBase:ConfigDataBase = new ConfigDataBase();
export const AppDataSource = new DataSource(configDataBase.getPgsqlConfig()).initialize();