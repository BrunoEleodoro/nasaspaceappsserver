var queries = require('../queries');

module.exports = {
    salvarProduto: salvarProduto,
    atualizarProduto: atualizarProduto,
    removerProduto: removerProduto,
    listarProdutos: listarProdutos
}

async function salvarProduto(body) {
    return await queries.create(body, 'Produto', 'produto');
}

async function atualizarProduto(id, new_body) {
    return await queries.update(id, new_body, 'produto')
}

async function removerProduto(id) {
    return await queries.remove(id, 'produto');
}

async function listarProdutos() {
    return await queries.read({}, 'produto');
}