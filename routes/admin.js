/// Where the admin of this page see
const express = require('express');
const productsController = require('../controllers/admin')
const router = express.Router();

/// html file
const path = require('path')

router.get('/add-product',productsController.getAddProduct);

router.post('/add-product',productsController.postAddProduct);

// router.get('/products',productsController.getProdutcs);




router.get('/result');


router.get('/edit-product/:productId',productsController.getEditProduct);

router.post('/edit-product',productsController.postEditProduct)








module.exports = router;
