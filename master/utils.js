
module.exports = {
    success: success,
    failure: failure,
    error_response: error_response
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