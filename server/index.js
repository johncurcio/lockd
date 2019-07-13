const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const constants = require('./constants');

mongoose.Promise = global.Promise;
mongoose.connect(constants.MONGO_URI, constants.MONGO_OPTIONS);

require('./models/shortener');

app.use(bodyParser.json());
app.use(helmet());

require('./routes/api')(app);

app.listen(process.env.port || 7000);

console.log('Listening on port 7000');