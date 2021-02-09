
const express = require('express');
const rootDir = require('./util/path')
const path = require('path');
const app = express();
app.set('view engine', 'ejs'); /// tell the express what we want to use dinamic tmeplate with pug engine
app.set('views', 'views') /// where to get these template (in here we use views is the default template)
const adminRoutes = require('./routes/admin');
const shopRoute = require('./routes/shop');
const User = require('./models/user');
const Cart = require('./models/cart');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
const errorController = require('./controllers/error')

//const db = require('./util/database')

//////////Model //////
const sequelDB = require('./util/sequelizeDB');
const Character = require('./models/character');

//const characterRoute = require('./routes/character');


const bodyParser = require('body-parser');
const Product = require('./models/product');
const CartItem = require('./models/cart-item');


app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => 
        {
         req.user = user;
         next();
         })
        .catch(err => {console.log(err)});
});


app.use('/admin', adminRoutes);
app.use(shopRoute);



app.use(express.static(path.join(__dirname, 'public')));
//app.use(characterRoute);
// db.execute('SELECT * FROM products')
//     .then(result => {
//         console.log(result[0]);
// })
// .catch (err => {
//     console.log(err);
// });


/// the sync method has a look  at all the models you are defined and sync them to database=> create table for them  
Product.belongsTo(User,{contraints:true, onDelete:'CASCADE'});

User.hasMany(Product);
User.hasOne(Cart); /// OR Cart.belongsTo(User); (Cai nao cung duoc)

//////// Cart ////////
Cart.belongsToMany(Product,{ through:CartItem })
Product.belongsToMany(Cart,{ through:CartItem });



/////// Order ///////

Order.belongsTo(User);
User.hasMany(Order);

Product.belongsToMany(Order,{through:OrderItem});
Order.belongsToMany(Product, {through: OrderItem});
 
//sequelDB.sync({ force: true})
 sequelDB.sync()
.then(result => {
    /// restart Server
    Character;
    return User.findByPk(1);
})
.then(user => {
    if (!user) {
      return User.create({ name: 'Duc', email: 'ducvu@gmail.com' });
    }
    return user })
// .then(user => {
//     return user.createCart()
// })
.then(user => 
    {
        app.listen(3000)
    })
.catch(err => {
    console.log(err);
})

app.use(errorController.get404)












