'use strict';

import {getProducts} from '../controllers/ProductController';

let express = require('express'),
    router = express.Router();

/* GET users listing. */
router.get('/', getProducts);

export {router}
