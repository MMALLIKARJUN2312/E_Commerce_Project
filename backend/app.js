const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const initializeDatabase = require('./db/db');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/payment');
const sessionRoutes = require('./routes/sessions');
const checkAdmin = require('./middleware/auth');

const app = express();
app.use(express.json());

const dbPromise = initializeDatabase();

app.use(
    session({
        store : new SQLiteStore({dbPromise, table : 'sessions'}),
        secret : 'your-secret-key',
        resave : false,
        saveUninitialized : false,
        // cookie : {secure : false}
    })
);

app.use('/users', userRoutes);
app.use('/products', checkAdmin, productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/payment', paymentRoutes);
app.use('/sessions', sessionRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


