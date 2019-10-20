require('dotenv').config()

const cloudinary = require('cloudinary');
var express = require('express');
var app = express();
var request = require('request')
const multipart = require('connect-multiparty');
const formData = require('express-form-data');
const multipartMiddleware = multipart();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
var port = process.env.PORT || 3001;

var bodyParser = require('body-parser');
// app.use(bodyParser.json());
var jsonParser = bodyParser.json()

app.use(bodyParser.json())
app.use(formData.parse())
app.use(bodyParser.urlencoded({ limit: 1024 * 1024 * 20, extended: false, parameterLimit: 1000000 }))

app.get('/', (req, res) => {
    res.json({
        alive: true
    })
});

app.post('/upload', async (req, res) => {
    if (req.headers.authorization != undefined) {
        request("https://serverless-auth-9d635e953080667d0fb696be75697428.brunoeleodoroecoquest.now.sh?type=verify&token=" + req.headers.authorization.split(' ')[1], async function (error, response, body) {
            console.log(body)
            if (error) {
                error_response(res);
            } else if (JSON.parse(body).valid != undefined && JSON.parse(body).valid == false) {
                error_response(res);
            } else {
                if (req.files != undefined && Object.keys(req.files).length > 0) {
                    var i = 0;
                    var imageList = []
                    while (i < Object.keys(req.files).length) {
                        var file = req.files[Object.keys(req.files)[i]]
                        let res = await upload(file.path)
                        if (res == false) {
                            imageList.push("failed-" + file.name)
                        } else {
                            imageList.push(res)
                        }
                        i++;
                    }
                    res.status(200).json({
                        status: 200,
                        response: imageList
                    })
                }
                else {
                    failure(res)
                }
            }
        })
    } else {
        error_response(res)
        // res.json({
        //     body: req.body,
        //     query: req.query,
        //     cookies: req.cookies,
        //     files: req.files,
        //     asdsa: Object.keys(req.files).length
        // });
    }
});
async function upload(path) {
    return new Promise(async function (resolve, reject) {
        cloudinary.v2.uploader.upload(path, {}, function (error, result) {
            if (error) {
                // return res.status(500).send(error);
                reject(false)
            } else {
                resolve(result.url)
            }
            // res.send({ 'code': '200', 'img':  });
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
    res.status(401).json({
        error: true
    })
}

app.listen(port, function () {
    console.log('Running on port=' + port);
});
