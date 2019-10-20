var queries = require('../queries');

module.exports = {
    salvarEmpresa: salvarEmpresa,
    atualizarEmpresa: atualizarEmpresa,
    removerEmpresa: removerEmpresa,
    listarEmpresas: listarEmpresas
}

async function salvarEmpresa(body) {
    return await queries.create(body, 'Empresas', 'empresa');
}

async function atualizarEmpresa(id, new_body) {
    return await queries.update(id, new_body, 'empresa')
}

async function removerEmpresa(id) {
    return await queries.remove(id, 'empresa');
}

async function listarEmpresas() {
    return await queries.read({}, 'empresa');
}