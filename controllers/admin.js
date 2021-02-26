const Product = require('../models/product');
const User = require('../models/user');
const New = require('../models/news')

exports.getAddProduct = (req, res, next) => {
    /// get ejs file
    res.render('admin/edit-product',
    {pageTitle: 'Add Product',
    path:'/admin/add-product',
    editing:false});

}

exports.postAddProduct = (req,res,next) => {
        /// POST data into database mySQL by sequelize
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const description = req.body.description;
        const price = parseInt(req.body.price);
        req.user.createProduct({
            title:title,
            imageUrl:imageUrl,
            description:description,
            price:price,
        })
        .then(res.redirect('/'))
        .catch(err => {
            console.log(err);
        });
    
}


exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        res.redirect('/')
    }
    const productId = req.params.productId;
    /// get ejs file
    req.user.getProducts({where:{id:productId}})
    .then(products => {
        const product = products[0]
        res.render('admin/edit-product',
        {
        products:product,
        pageTitle: 'Add Product',
        path:'/edit-product',
        editing: editMode
        })
}).catch(err => console.log(err));
   ;
}

exports.postEditProduct = (req,res,next) => {
    const id = req.body.productId;
    // POST data into database mySQL by sequelize
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = parseInt(req.body.price);
   Product.findByPk(id)
   .then(products => {
    products.title = title;
    products.imageUrl = imageUrl;
    products.description = description;
    products.price = price;
    return products.save();
   })
   .then(result =>
     {
    console.log('UPDATED PRODUCT!!!!');  
    res.redirect('/cart')
    })
   .catch(err => console.log(err));
}

exports.postDeleteProduct = (req,res,next) => {
    const id = req.body.productId;
    Product.findByPk(id)
   .then(product => {
       return product.destroy()
    })
   .then(result => {
       console.log('PRODUCT WAS DELETED FROM CART !!!');
       res.redirect('/cart');
    }
       )
   .catch(err => {console.log(err)})
}

exports.getNew = (req, res, next) => {
   res.render('admin/add-new',{
       pageTitle:'Add News',
       path:'/admin/add-new'
   });
}

exports.postNew = (req, res, next) => {
    const title = req.body.title;
    const newURL = req.body.newsUrl;
    console.log(req.body.newsUrl);
    New.create({
        title:title,
        newsUrl:newURL
    })
    .then(result => {
        res.redirect('/')
    }
    )
    .catch(err => console.log(err))
}


