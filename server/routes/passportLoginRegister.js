const express = require('express');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const UserModel = require('../models/userModel');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, isTeacher } = req.body;

    // auth will take approximately 13 seconds
    const hashCost = 10;

    try {
        const passwordHash = await bcrypt.hash(password, hashCost);
        const userDocument = new UserModel({ username, passwordHash, isTeacher });
        await userDocument.save();

        res.status(200).send({ username });
    } catch (error) {
        res.status(400).send({
            error: 'req body should take the form {username, password}'
        });
    }
});

router.post('/login', function (req, res, next) {

    passport.authenticate('local', {session: false}, (err, user, info) => {

        req.login(user, {session: false}, () => {
            if (err) {
                return res.status(400).send(err);
            }

            const token = jwt.sign(JSON.parse(JSON.stringify(user)), config.TOKEN_SECRET);

            res.status(200).send({ user, token });
        });
    })
    (req, res);

});

module.exports = router;