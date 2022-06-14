const express = require('express')
const cors = require('cors');
require('./config/db');
require('dotenv').config();

const { PORT = 3050 } = process.env;

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes/index');
routes(app);

app.use('/', express.static('./client/build'));

app.listen(PORT, () => {
  console.log(`I work in port ${PORT}`);
});

exports.app = app;