require('dotenv').config()
var express = require('express');
var app = express();
var request = require('request')
const multipart = require('connect-multiparty');
const { check, validationResult } = require('express-validator')
const multipartMiddleware = multipart();
const utils = require('./utils');
const { auth_url, database_url, mail_url, storage_url } = require('./urls')

const desafio = require('./desafio');
const empresa = require('./empresa');
const produto = require('./produto');

var port = process.env.PORT || 3001;
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        alive: true
    })
});

app.post('/user/authenticate', [
    check('email').isEmail(),
    check('password').isLength({ min: 3 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    request.post({
        headers: { 'content-type': 'application/json' },
        url: database_url,
        body: JSON.stringify({
            route: "/user/authenticate",
            email: req.body.email,
            password: req.body.password
        })
    }, function (error, response, body) {
        if (error) {
            utils.error_response(res)
            return;
        }
        res.json(JSON.parse(body))
    });
});

app.post("/user/signup", [
    check('email').isEmail(),
    check('password').isLength({ min: 3 }),
    check('username').isEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    request.post({
        headers: { 'content-type': 'application/json' },
        url: database_url,
        body: JSON.stringify({
            route: "/user/signup",
            body: req.body
        })
    }, function (error, response, body) {
        if (error) {
            utils.error_response(res)
            return;
        }
        res.json(JSON.parse(body))
    });
});

app.post("/user/listAllUsers", (req, res) => {
    if (req.headers.authorization != undefined) {
        var token = req.headers.authorization.split(" ")[1]
        request.post({
            headers: { 'content-type': 'application/json' },
            url: database_url + "?token=" + token,
            body: JSON.stringify({
                route: "/user/listAllUsers",
            })
        }, function (error, response, body) {
            if (error) {
                utils.error_response(res)
                return;
            }
            res.json(JSON.parse(body))
        });
    } else {
        utils.error_response(res)
    }
});

desafio.init(app);
empresa.init(app);
produto.init(app);

app.listen(port, function () {
    console.log('Running on port=' + 3000);
});
