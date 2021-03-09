const Product = require('../models/product');
const Order = require('../models/order');
const New = require('../models/news')
const Character = require('../models/character');

exports.getAddProduct = (req, res, next) => {
    /// get ejs file
    res.render('admin/add-product',
    {pageTitle: 'Add Product',path:'/admin/add-product'});
}

// exports.postAddProduct = (req,res,next) => {
//         /// request can't parse data by default, you must import package to parse data =>"bodyParser"
//         const product = new Product();
//         product.save();
//         res.redirect('/');
//     ;
// }


exports.getProduct = (req, res, next) => {
    Product.findAll()
     .then(products => {
     res.render('shop/product-list',
     {prods: products,
      pageTitle:'Home Page',
      path:'/',
      isAuthenticated:req.isLoggedin})
     }).catch(err => console.log(err));


}


exports.getProductDetail = (req, res, next) => {
// const proID = req.params.productID;
// Product.findByID(proID)
// .then(([rows])=> {
//     console.log(rows[0])
//     res.render('shop/product-detail',{
//         prods: rows[0],
//         pageTitle:'Product Detail',
//         path:'/products'
//     })
// })
// .catch(err=> {console.log(err)})
const productId = req.params.productID;
Product.findByPk(productId)
.then(products => {
    res.render('shop/product-detail',
    {
        prods:products,
        pageTitle: products.title,
        path:'/products',
        isAuthenticated:req.isLoggedin
    })
})
.catch(err => console.log(err));
}


exports.getCharacterLiyue = (req, res, next) => {
   Character.findAll({ where: { location: 'liyu' } })
   .then(products => {
    res.render('shop/character',{
        chars: products,
        pageTitle:'Character',
        path:'/character/liyue',
        isAuthenticated:req.isLoggedin
    })
   })
   .catch(err => console.log(err));
}

exports.getCharacterMonst = (req, res, next) => {
    Character.findAll({ where: { location: 'monst' } })
    .then(products => {
     console.log(products)
     res.render('shop/monstChar',{
         chars: products,
         pageTitle:'Character',
         path:'/character/mondstadt',
         isAuthenticated:req.isLoggedin
     })
    })
    .catch(err => console.log(err));
 }

exports.getIndex = (req, res, next) => {
     console.log('this is cookie' + req.isLoggedin)
     // res.sendFile(path.join(rootDir,'views','shop.html'));
     /// rows is the first element in array result => you can understand rows = result[0]
     New.findAll({limit:5
        ,order:[['createdAt','DESC']]})
     .then(results => {
        res.render('shop/index',
        {
         news:results,
         pageTitle:'Home Page',
         path:'/', 
         isAuthenticated:req.isLoggedin  
        });
     })
     .catch(err => console.log(err))
    

    
}



exports.getCart = (req, res, next) => {
    var total = 0;
    req.user.getCart()
    .then(cart => {
        return cart.getProducts()
        .then(products => {      
            res.render('shop/cart',
            {prods: products,
             pageTitle:'Home Page',
             path:'/cart',
             isAuthenticated:req.isLoggedin}
             )
        }).catch(err => console.log(err))
    })
    .catch(err => console.log(err));

}


exports.postCart = (req, res, next) => {
    const proID = req.body.productId;
    let newQuantity = 1;
    let fetchCart;
    req.user.getCart()
    .then(cart => {
        fetchCart = cart;
        return cart.getProducts({ where: { id: proID } });
    })
    .then(products => {
        let product;
        if(products.length > 0) {
            product = products[0];
        }

        if(product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1 ;
        }
        return Product.findByPk(proID)
        .then(product => {
            return  fetchCart.addProducts(product, { through: {quantity: newQuantity }
            })
        .then(result => {res.redirect('/cart')});
        })
         .catch(err => console.log(err))
       
    })
    .catch(err => {console.log(err)})
    // Product.findByID(proID,(product) => {
    //  Cart.addProduct(proID,product.price);
    // });
    // res.redirect('/cart')
 }


 exports.postCartDeleteProduct  = (req, res, next) => {
      const proID = req.body.productId;
      req.user.getCart()
      .then(cart => {
          return cart.getProducts({ where: { id: proID } });
      } )
      .then(products => {
          const product = products[0];
         return  product.cartItem.destroy();
      })
      .then(result => {res.redirect('/cart')})
     
      .catch(err => {console.log(err)})
 }
 

exports.getCheckOut = (req, res, next) => {
    res.render('shop/checkout',{
        path:'/checkout',
        pageTitle:'CheckOut',
        isAuthenticated:req.isLoggedin
    })
}

exports.postOrder = (req,res,next) => {
    req.user.getCart()
    .then(cart => {
        return cart.getProducts()
    })
    .then(products => {
        console.log(products);
        return req.user.createOrder()
        .then(order => {
             order.addProduct(products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity};
                return product
            }))
        })
        .catch(err => {console.log(err)});
    })
    .then(result => res.redirect('/'))
    .catch(err => console.log(err))
}

exports.getOders = (req, res, next) => {
    res.render('shop/order',{
        path:'/order',
        pageTitle:'Order',
        isAuthenticated:req.isLoggedin
    })
}



