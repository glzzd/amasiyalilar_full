const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const connectDB = require('./config/database');
const routes = require('./routes/v1'); // Changed to point to v1 index
const globalErrorHandler = require('./middlewares/errors/globalErrorHandler');
const notFoundHandler = require('./middlewares/errors/notFoundHandler');

connectDB();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use('/api/v1', routes); // Using v1 prefix explicitly

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server işləyir', status: 'OK' });
});

app.use(globalErrorHandler);
app.use('*', notFoundHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server ${PORT} nömrəli portda işləyir`);
  console.log(`Cari mühit: ${process.env.NODE_ENV}`);
});
