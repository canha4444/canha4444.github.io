/// Where the user see
const express = require('express');
const shopController = require('../controllers/shop')


///html file

const router = express.Router();

router.get('/',shopController.getIndex);

router.get('/products',shopController.getProduct);

router.get('/character/liyue',shopController.getCharacterLiyue);

router.get('/character/mondstadt',shopController.getCharacterMonst);

router.get('/cart',shopController.getCart);

router.post('/cart',shopController.postCart);

router.get('/checkout',shopController.getCheckOut);

router.get('/order',shopController.getOders);

router.get('/products/:productID',shopController.getProductDetail); /// we will get productID by using syntax: req.params.productID

router.get('/delete-product',shopController.postDeleteProduct)

router.post('/create-order',shopController.postOrder);


module.exports = router