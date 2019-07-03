const express = require('express');
const passport = require('passport');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const router = express.Router();
const server = http.Server(app);
const io = socketIO(server);

router.get('/protected',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { user } = req;

    // The event will be called when a client is connected.
    io.on('connection', socket => {
        console.log('A client just joined on', socket.id);

        socket.on('message', (msg) => {
            console.log(msg[0]);
        });

        socket.on('setForm', (form) => {
            const newForm = new Form();app
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

    res.status(200).send({ user });
});

module.exports = router;