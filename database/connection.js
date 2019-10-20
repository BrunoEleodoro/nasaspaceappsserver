require('dotenv').config()
var mongoose = require('mongoose');
var db_old = null;

module.exports = {
    connect_db: connect_db
}

function connect_db() {
    return new Promise(function (resolve, reject) {
        if(db_old == null) {
            mongoose.connect(process.env.MONGO_URL, function (err, db_new) {
                if (err) {
                    console.log('MongoDB erro=' + err)
                    reject(null)
                } else {
                    db_old = db_new
                    resolve(db_new)
                }
            });
        }
        else {
            resolve(db_old)
        }
    });
}