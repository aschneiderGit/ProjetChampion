const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const app = express();
const dbUrl = 'mongodb://lpiot:descartes75@ds026558.mlab.com:26558/amphi-app';
const server = http.Server(app);
const io = socketIO(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var Message = mongoose.model('Message', { name: String, id: String, message: String });
var Form = mongoose.model('Form', { name: String, a1: String, a2: String, a3: String, a4: String, a5: String });

// The event will be called when a client is connected.
io.on('connection', socket => {
  console.log('A client just joined on', socket.id);

  socket.on('message', (msg) => {
    console.log(msg[0]);
  });

  socket.on('setForm', (form) => {
    const newForm = new Form();
    newForm.name = form.question;
    newForm.a1 = form.answer1;
    newForm.a2 = form.answer2;
    newForm.a3 = form.answer3;
    newForm.a4 = form.answer4;
    newForm.a5 = form.answer5;
    newForm.save((err) => {
      if (err) console.log(err);
      else socket.emit('successfullySetForm');
    });
  })
});

server.listen(PORT, () => {
  console.log('Server started and listening on port ' + PORT);
});

mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
  console.log('mongodb connected');
  if (err) console.log(err);
});