const express = require('express');
const apiRouter = require('./routes/api');
const passport = require('passport');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

require('dotenv').config();

//DB

const mongoDB = process.env.MONGO_URI;
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(mongoDB, mongoOptions, () =>
  console.log('Connection Successful')
);

const db = mongoose.connection;

db.on(
  'error',
  console.error.bind(console, 'Error while connecting to the database')
);

let corsOptions = {
  origin: ['http://localhost:8080', 'http://localhost:3000'],
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.options('*', cors(corsOptions));

// --- Pasport Authentication

require('./config/passport');

app.use(cors(corsOptions), apiRouter);

app.listen(port, () => console.log(`Listening on ${port}`));
