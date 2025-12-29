
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const logPostMiddleware = require('./middleware/logPost');

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use(session({
  secret: 'bookshelfsecret',
  resave: false,
  saveUninitialized: false
}));

mongoose.connect('mongodb://localhost:27017/bookshelf');

app.use('/api/auth', authRoutes);
app.use('/api/books', logPostMiddleware, bookRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
