const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();

// 1. Enable CORS with credentials BEFORE session middleware
app.use(cors({
  origin: 'http://127.0.0.1:5500', // frontend origin
  credentials: true
}));

// 2. Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Session setup
app.use(session({
  secret: 'your_secret_key', // keep this strong in prod
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // true in HTTPS only
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));


// 4. Connect to MongoDB
const connectDB = require('./db');
connectDB();

// 5. Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

const cartRoutes = require('./routes/cartRoute');
app.use('/api/cart', cartRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
