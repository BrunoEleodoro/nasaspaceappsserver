require('dotenv').config()
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET

module.exports = (req, res) => {
    if (req.query.type != undefined && req.query.type == "verify") {
        jwt.verify(req.query.token, secret, function (err, payload) {
            var isValid = false;
            if (!err) {
                isValid = true;
            }
            res.json({
                token: req.query.token,
                valid: isValid,
                payload: payload
            });
        });
    } else if (req.query.type != undefined && req.query.type == "generate") {
        var token = jwt.sign({ userId: req.query.email }, secret, { expiresIn: '1h' });
        res.json({
            token: token
        });
    }
    else {
        res.send({ alive: true })
    }

}
