// ===============================================================================
// ======================[REQUIRE MODULE]=========================================

const
    express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors'),
    env = require('dotenv'),
    db = require('./api/midlleware/db');

// ===============================================================================
// ======================[REQUIRE ROUTES]=========================================
const
    productRoutes = require('./api/routes/product.routes'),
    adminRoutes = require('./api/routes/admin.routes'),
    categoryRoutes = require('./api/routes/category.routes'),
    historyRoutes = require('./api/routes/history.routes')
// ===============================================================================
// ======================[USE MODULE FOR STARTED]=================================

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(db)

env.config();

// ===============================================================================
// ======================[USE ROUTES]=============================================

app.use('/products', productRoutes);
app.use('/admins', adminRoutes);
app.use('/categories', categoryRoutes);
app.use('/histories', historyRoutes);

module.exports = app;
