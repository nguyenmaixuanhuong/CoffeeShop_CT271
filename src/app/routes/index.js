const registerRoute = require('./registerRoute')
const loginRouter = require('./loginRoute')
const productsRouter = require('./productsRoute')
const userRouter = require('./userRoute')
const productApiRouter = require('./productsApiRoute')
const cartRouter = require('./cartRoute')
const OrderRouter = require('./orderRoute')
const siteRoute = require('./siteRoute')
function route(app){
    app.use('/register',registerRoute);
    app.use('/login',loginRouter);
    app.use('/admin/user',userRouter);
    app.use('/admin/products',productsRouter);
   app.use('/api',productApiRouter);
   app.use('/cart', cartRouter);
   app.use('/admin/order',OrderRouter);
   app.use('/admin',siteRoute);
}

module.exports = route;