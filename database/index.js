require('dotenv').config()
var request = require('request')
var user = require('./users/users')
var desafio = require('./desafio/desafio')
var empresa = require('./empresa/empresa')
var produto = require('./produto/produto')

var fs = require('fs')

module.exports = (req, res) => {
    if (req.query.token != undefined) {
        request("https://serverless-auth-9d635e953080667d0fb696be75697428.brunoeleodoroecoquest.now.sh?type=verify&token=" + req.query.token, async function (error, response, body) {
            console.log(body)
            if (error) {
                error_response(res);
            } else if (JSON.parse(body).valid != undefined && JSON.parse(body).valid == false) {
                error_response(res);
            } else {

                if (req.body.route != undefined && req.body.route == "") {
                    res.json({
                        status: 201,
                        message: 'no route provided'
                    });
                } else if (req.body.route == "/user/listAllUsers") {
                    res.json({
                        status: 200,
                        response: await user.listAllUsers({})
                    })
                } else if (req.body.route == "/user/updateUser") {
                    if (await user.update(req.body.id, req.body.body)) {
                        res.json({
                            status: 200,
                            response: req.body.body
                        })
                    } else {
                        failure(res)
                    }
                } else if (req.body.route == "/desafio/salvarDesafio") {
                    if (await desafio.salvarDesafio(req.body.body)) {
                        res.json({
                            status: 200,
                            response: req.body.body
                        })
                    } else {
                        failure(res)
                    }
                } else if (req.body.route == "/desafio/atualizarDesafio") {
                    if (await desafio.atualizarDesafio(req.body.id, req.body.body)) {
                        res.json({
                            status: 200,
                            response: req.body.body
                        })
                    } else {
                        failure(res)
                    }
                } else if (req.body.route == "/desafio/removerDesafio") {
                    if (await desafio.removerDesafio(req.body.id)) {
                        res.json({
                            status: 200,
                            response: 'removed'
                        })
                    } else {
                        failure(res)
                    }
                } else if (req.body.route == "/desafio/listarDesafios") {
                    res.json({
                        status: 200,
                        response: await desafio.listarDesafios({})
                    })
                } else if (req.body.route == "/empresa/salvarEmpresa") {
                    if (await empresa.salvarEmpresa(req.body.body)) {
                        res.json({
                            status: 200,
                            response: req.body.body
                        })
                    } else {
                        failure(res)
                    }
                } else if (req.body.route == "/empresa/atualizarEmpresa") {
                    if (await empresa.atualizarEmpresa(req.body.id, req.body.body)) {
                        res.json({
                            status: 200,
                            response: req.body.body
                        })
                    } else {
                        failure(res)
                    }
                } else if (req.body.route == "/empresa/removerEmpresa") {
                    if (await empresa.removerEmpresa(req.body.id)) {
                        res.json({
                            status: 200,
                            response: 'removed'
                        })
                    } else {
                        failure(res)
                    }
                } else if (req.body.route == "/empresa/listarEmpresas") {
                    res.json({
                        status: 200,
                        response: await empresa.listarEmpresas({})
                    })
                } else if (req.body.route == "/produto/salvarProduto") {
                    if (await produto.salvarProduto(req.body.body)) {
                        res.json({
                            status: 200,
                            response: req.body.body
                        })
                    } else {
                        failure(res)
                    }
                } else if (req.body.route == "/produto/atualizarProduto") {
                    if (await produto.atualizarProduto(req.body.id, req.body.body)) {
                        res.json({
                            status: 200,
                            response: req.body.body
                        })
                    } else {
                        failure(res)
                    }
                } else if (req.body.route == "/produto/removerProduto") {
                    if (await produto.removerProduto(req.body.id)) {
                        res.json({
                            status: 200,
                            response: 'removed'
                        })
                    } else {
                        failure(res)
                    }
                } else if (req.body.route == "/produto/listarProdutos") {
                    res.json({
                        status: 200,
                        response: await produto.listarProdutos({})
                    })
                } else {
                    res.json({
                        status: 202,
                        message: 'nothing to do'
                    });
                }

            }
        });
    }
    else {
        basicMethods(req, res)
    }
}

async function basicMethods(req, res) {
    //authenticate method
    if (req.body != undefined && req.body.route != undefined && req.body.route == "/user/authenticate") {
        if (await user.authenticate(req.body.email, req.body.password)) {
            var token_body = await generateToken(req.body.email);
            if (token_body == false) {
                error_response(res);
            } else {
                res.json({
                    token: token_body.token
                })
            }
        } else {
            failure(res);
        }
    } else if (req.body.route != undefined && req.body.route == "/user/signup") {

        if (await user.signup(req.body.body)) {
            var token_body = await generateToken(req.body.body.email);
            if (token_body == false) {
                error_response(res);
            } else {
                res.json({
                    token: token_body.token
                })
            }
        } else {
            failure(res);
        }
    } else {
        res.json({
            alive: true
        })
    }
}

function generateToken(email) {
    return new Promise(async function (resolve, reject) {
        request("https://serverless-auth-9d635e953080667d0fb696be75697428.brunoeleodoroecoquest.now.sh?type=generate&email=" + email, async function (error, response, body) {
            if (error) {
                reject(false);
            } else {
                resolve(JSON.parse(body))
            }
        });
    })
}

function success(res) {
    res.json({
        status: 200,
        success: true
    });
}
function failure(res) {
    res.json({
        status: 201,
        success: false
    });
}
function error_response(res) {
    res.json({
        error: true
    })
}