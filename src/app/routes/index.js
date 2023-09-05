const registerRoute = require('./registerRoute')
const siteRouter = require('./siteRoute')
const loginRouter = require('./loginRoute')
const productsRouter = require('./productsRoute')
const adminRouter = require('./adminRoute')
function route(app){

    app.use('/register',registerRoute);
    app.use('/login',loginRouter);
    app.use('/products',productsRouter);
    app.use('/admin',adminRouter);
    app.use('/',siteRouter);
   
}

module.exports = route;