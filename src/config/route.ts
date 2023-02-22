'use strict';

import * as indexRouter from "../routes/AppRoutes";
import * as productsRouter from "../routes/ProductRoutes";
import * as searchProducts from "../routes/SearchProducts";

class RoutesConfig{
    protected arrayRoutes: Array<any>;
    constructor() {
        this.arrayRoutes = [
            {"path": '/products', "route_parameter": productsRouter},
            {"path": '/search', "route_parameter": searchProducts},
            {"path": '/', "route_parameter": indexRouter}
        ];
    }

    getFirstRoute(){
        return this.arrayRoutes[0];
    }

    getRoutes (){
        return this.arrayRoutes;
    }
}

export {
    RoutesConfig
};