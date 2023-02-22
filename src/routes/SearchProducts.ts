'use strict';

import {searchProducts} from '../controllers/SearchProductController';
import {validationCompanyPrefix} from "../middleware/ValidationCompanyPrefix";

let express = require('express'),
    router = express.Router();

/* GET users listing. */
router.get('/:companyPrefix/',[validationCompanyPrefix] , searchProducts);

export {router}
