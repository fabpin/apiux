'use strict';

import {NextFunction, Request, Response} from "express";
import {CompanyPrefix, CompanyPrefixEnum} from "../helpers/SystemsParameters";
import {Error} from "../helpers/SystemInterface";

function validationCompanyPrefix(req:Request, res:Response, next:NextFunction){
    let companyPrefix:CompanyPrefix = req.params.companyPrefix;
    switch (companyPrefix) {
        case CompanyPrefixEnum.WooCommerce:
            next();
            return true;
        case CompanyPrefixEnum.Shopify:
            next();
            return true;
        default:
            let error:Error = { cod: 403, message: 'Error ocurrido en la validacion del path'};
            res.status(error.cod).json(error);
    }
}

export {validationCompanyPrefix};