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

    app.post("/empresa/salvarEmpresa", (req, res) => {
        if (req.headers.authorization != undefined) {
            var token = req.headers.authorization.split(" ")[1]
            request.post({
                headers: { 'content-type': 'application/json' },
                url: database_url + "?token=" + token,
                body: JSON.stringify({
                    route: "/empresa/salvarEmpresa",
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

    app.post("/empresa/atualizarEmpresa", (req, res) => {
        if (req.headers.authorization != undefined) {
            var token = req.headers.authorization.split(" ")[1]
            request.post({
                headers: { 'content-type': 'application/json' },
                url: database_url + "?token=" + token,
                body: JSON.stringify({
                    route: "/empresa/atualizarEmpresa",
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

    app.post("/empresa/removerEmpresa", (req, res) => {
        if (req.headers.authorization != undefined) {
            var token = req.headers.authorization.split(" ")[1]
            request.post({
                headers: { 'content-type': 'application/json' },
                url: database_url + "?token=" + token,
                body: JSON.stringify({
                    route: "/empresa/removerEmpresa",
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

    app.post("/empresa/listarEmpresas", (req, res) => {
        if (req.headers.authorization != undefined) {
            var token = req.headers.authorization.split(" ")[1]
            request.post({
                headers: { 'content-type': 'application/json' },
                url: database_url + "?token=" + token,
                body: JSON.stringify({
                    route: "/empresa/listarEmpresas",
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

}