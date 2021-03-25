/// Where the user see

const express = require('express');
const shopController = require('../controllers/shop')
const isAuth = require('../middleware/is-auth')


///html file

const router = express.Router();

router.get('/',shopController.getIndex);

router.get('/products',shopController.getProduct);

router.get('/character/liyue',shopController.getCharacterLiyue);

router.get('/character/mondstadt',shopController.getCharacterMonst);

router.get('/cart',isAuth,shopController.getCart);

router.post('/cart',isAuth,shopController.postCart);

router.get('/checkout',isAuth,shopController.getCheckOut);

router.get('/order',isAuth,shopController.getOders);

router.get('/products/:productID',shopController.getProductDetail); /// we will get productID by using syntax: req.params.productID

router.post('/delete-product',isAuth,shopController.postCartDeleteProduct)

router.post('/create-order',isAuth,shopController.postOrder);
//////


module.exports = router