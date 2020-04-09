require('dotenv').config();
const express = require('express');
const connectDB = require('../config/db');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const app = express();

//Connect Database
connectDB();

//Init Middleware

app.use(express.json({ extended: false }));

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
  res.send('API running');
});

app.use('/api/users', require('../routes/api/users'));
app.use('/api/auth', require('../routes/api/auth'));
app.use('/api/profile', require('../routes/api/profile'));
app.use('/api/posts', require('../routes/api/posts'));
app.use('/api/spotify-login', require('../routes/api/spotify-login'));
app.use('/api/forgotpass', require('../routes/api/forgotpassword'));
app.use('/api/reset', require('../routes/api/reset-password'));
app.use('/api/updatepass', require('../routes/api/updatePassword'));

module.exports = app;
