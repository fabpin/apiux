import {IResponseProduct} from "../../providers/IResponseProduct";

export interface IEcommerceCommunication {
    get(): Promise<IResponseProduct>
}