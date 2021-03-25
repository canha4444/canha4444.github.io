/// Where the admin of this page see
const express = require('express');
const productsController = require('../controllers/admin')
const isAuth = require('../middleware/is-auth')
const router = express.Router();


/// html file
const path = require('path')

//// Check user login or not, if user didn'g login => navigate user to "login" page
router.use(isAuth);
router.get('/add-product',productsController.getAddProduct);

router.post('/add-product',productsController.postAddProduct);

// router.get('/products',productsController.getProdutcs);


router.get('/result');

router.get('/edit-product/:productId',productsController.getEditProduct);

router.post('/edit-product',productsController.postEditProduct)
///

router.get('/add-new',productsController.getNew);

router.post('/add-new',productsController.postNew);





module.exports = router;
