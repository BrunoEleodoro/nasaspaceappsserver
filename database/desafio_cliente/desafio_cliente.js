var queries = require('../queries');

module.exports = {
    salvarDesafioCliente: salvarDesafioCliente,
    atualizarDesafioCliente: atualizarDesafioCliente,
    removerDesafioCliente: removerDesafioCliente,
    listarDesafioClientes: listarDesafioClientes
}

async function salvarDesafioCliente(body) {
    return await queries.create(body, 'DesafioCliente', 'desafio_cliente');
}

async function atualizarDesafioCliente(id, new_body) {
    return await queries.update(id, new_body, 'desafio_cliente')
}

async function removerDesafioCliente(id) {
    return await queries.remove(id, 'desafio_cliente');
}

async function listarDesafioClientes(email) {
    return await queries.read({ email: email }, 'desafio_cliente');
}