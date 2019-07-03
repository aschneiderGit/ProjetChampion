const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const config = require('./config');
const loginRoute = require('./routes/passportLoginRegister');
const connectedRoute = require('./routes/protectedRoute');

const app = express();
const server = http.Server(app);

require('./passport');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', loginRoute);
app.use('/', connectedRoute);

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true }, (err) => {
  console.log('mongodb connected');
  if (err) console.log(err);
});

server.listen(config.LISTEN_PORT, () => {
  console.log('Server started and listening on port ' + config.LISTEN_PORT);
});