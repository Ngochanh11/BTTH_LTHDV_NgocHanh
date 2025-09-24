require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Route test
app.get('/', (req, res) => {
  res.send('🚀 Server chạy OK');
});

const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

// Lắng nghe port từ .env
const PORT = process.env.PORT || 4100;
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT} - mode: ${process.env.NODE_ENV}`);
});
