var queries = require('../queries');

module.exports = {
    salvarDesafio: salvarDesafio,
    atualizarDesafio: atualizarDesafio,
    removerDesafio: removerDesafio,
    listarDesafios: listarDesafios
}

async function salvarDesafio(body) {
    return await queries.create(body, 'Desafio', 'desafio');
}

async function atualizarDesafio(id, new_body) {
    return await queries.update(id, new_body, 'desafio')
}

async function removerDesafio(id) {
    return await queries.remove(id, 'desafio');
}

async function listarDesafios() {
    return await queries.read({}, 'desafio');
}