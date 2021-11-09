
const usersRouter= require('./users');
const storesRouter= require('./stores');
const rolesRouter= require('./roles');
const providersRouter= require('./providers');
const productsRouter= require('./products');
const permissionsRouter= require('./permissions');
const ordersRouter= require('./orders');
const ordersDetailsRouter= require('./orderDetails');
const notificaionsRouter= require('./notifications');
const newsRouter= require('./news');
const modulesRouter= require('./modules');
const functionsRouter= require('./functions');
const customersRouter= require('./customer');
const categoriesRouter= require('./categories');
const bookingsRouter= require('./bookings');
const bookingDetailsRouter= require('./bookingDetails');
const ecommerceRouter = require('./ecommerce');
const teamRouter = require('./team')
const newsCateRouter = require('./newsCategory');
const brandRouter = require('./brands');
const productPropertyRouter = require('./productProperty');
const productFeature = require('./productFeature');
function route (app){
    app.use('/users',usersRouter)
    // app.use('/images',imageRouter),
    //app.use('/posts',postsRouter)
    app.use('/stores',storesRouter)
    app.use('/roles',rolesRouter),
    app.use('/providers',providersRouter),
    app.use('/products',productsRouter),
    app.use('/permissions',permissionsRouter),
    app.use('/orders',ordersRouter),
    app.use('/order-details',ordersDetailsRouter)
    app.use('/notifications',notificaionsRouter),
    app.use('/news',newsRouter),
    app.use('/modules',modulesRouter),
    app.use('/functions',functionsRouter),
    app.use('/customers',customersRouter),
    app.use('/categories',categoriesRouter),
    app.use('/bookings',bookingsRouter),
    app.use('/booking-details',bookingDetailsRouter),
    app.use('/ecommerce', ecommerceRouter),
    app.use('/team', teamRouter),
    app.use('/news-cate', newsCateRouter),
    app.use('/brands',brandRouter),
    app.use('/product-property',productPropertyRouter),
    app.use('/product-feature', productFeature)

};
module.exports= route;