var queries = require('../queries');

module.exports = {
    authenticate: authenticate,
    signup: signup,
    listAllUsers: listAllUsers,
    update: update
}

async function authenticate(email, password) {
    var res = await queries.read({ email: email, password: password }, 'users');
    if (res[0] != undefined) {
        return true
    } else {
        return false
    }
}

async function signup(body) {
    var res = await queries.create(body, 'User', 'users');
    if (res) {
        return res
    } else {
        return false
    }
}

async function update(id, new_body) {
    var res = await queries.update(id, new_body, 'users')
    if (res) {
        return res
    } else {
        return false
    }
}

async function listAllUsers(filter) {
    var res = await queries.read(filter, 'users');
    if (res) {
        return res
    } else {
        return false
    }
}