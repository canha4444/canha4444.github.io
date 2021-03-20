
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./util/path')
const path = require('path');
const app = express();
app.set('view engine', 'ejs'); /// tell the express what we want to use dinamic tmeplate with pug engine
app.set('views', 'views') /// where to get these template (in here we use views is the default template)
const adminRoutes = require('./routes/admin');
const shopRoute = require('./routes/shop');
const authRoute = require('./routes/auth');
const User = require('./models/user');
const Cart = require('./models/cart');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
const errorController = require('./controllers/error');
const sequelDB = require('./util/sequelizeDB');
const Character = require('./models/character');
var session = require('express-session');
var SequelizeStore = require("connect-session-sequelize")(session.Store);


//////////Model //////


//const characterRoute = require('./routes/character');


const Product = require('./models/product');
const CartItem = require('./models/cart-item');
const News = require('./models/news');


//// Use to parse req.body  to JSON
app.use(express.urlencoded({ extended: false }));

/// Session /////
///// this will take your current session on your browser and will find it  in your session database=> If match, it will take that session
/// If no session match in database, it will return none  
app.use(
  session({
    secret: "session_secret",
    store: new SequelizeStore({
      db: sequelDB,
    }),
    resave: false,
    saveUninitialized:false
  })
);


//// Normally, Sequelize will get the data from table session and store it in session on browser. But, that just the data => not Sequelize model
/// So we need to define below code
  
app.use((req, res, next) => {
  
    if(!req.session.user) {
      ///// if can't find req.session => next() the app.use to render page
      return next()
    }
    User.findByPk(req.session.user.id)
    .then(user => {
      req.sessionUser = user;
      next()
    })
    .catch(err => console.log(err))
  })


app.use('/admin', adminRoutes);
app.use(shopRoute);
app.use(authRoute);





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
Order.belongsToMany(Product,{through:OrderItem});

 
//sequelDB.sync({ force: true})
 sequelDB.sync()
.then(result => {
    /// restart Server
    Character;
    News;
})
.then(user => 
    {
        app.listen(3000)
    })
.catch(err => {
    console.log(err);
})

app.use(errorController.get404)












