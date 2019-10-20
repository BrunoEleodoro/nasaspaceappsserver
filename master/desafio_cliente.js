var request = require('request')
const multipart = require('connect-multiparty');
const { check, validationResult } = require('express-validator')
const multipartMiddleware = multipart();
const utils = require('./utils');
const { auth_url, database_url, mail_url, storage_url } = require('./urls')

module.exports = {
    init: init
}

async function init(app) {

    app.post("/desafio_cliente/salvarDesafioCliente", (req, res) => {
        if (req.headers.authorization != undefined) {
            var token = req.headers.authorization.split(" ")[1]
            request.post({
                headers: { 'content-type': 'application/json' },
                url: database_url + "?token=" + token,
                body: JSON.stringify({
                    route: "/desafio_cliente/salvarDesafioCliente",
                    body: req.body
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

    app.post("/desafio_cliente/atualizarDesafioCliente", (req, res) => {
        if (req.headers.authorization != undefined) {
            var token = req.headers.authorization.split(" ")[1]
            request.post({
                headers: { 'content-type': 'application/json' },
                url: database_url + "?token=" + token,
                body: JSON.stringify({
                    route: "/desafio_cliente/atualizarDesafioCliente",
                    id: req.body.id,
                    body: req.body
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

    app.post("/desafio_cliente/removerDesafioCliente", (req, res) => {
        if (req.headers.authorization != undefined) {
            var token = req.headers.authorization.split(" ")[1]
            request.post({
                headers: { 'content-type': 'application/json' },
                url: database_url + "?token=" + token,
                body: JSON.stringify({
                    route: "/desafio_cliente/removerDesafioCliente",
                    id: req.body.id,
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

    app.post("/desafio_cliente/listarDesafioClientes", (req, res) => {
        if (req.headers.authorization != undefined) {
            var token = req.headers.authorization.split(" ")[1]
            request.post({
                headers: { 'content-type': 'application/json' },
                url: database_url + "?token=" + token,
                body: JSON.stringify({
                    route: "/desafio_cliente/listarDesafioClientes",
                    email: req.body.email
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

}