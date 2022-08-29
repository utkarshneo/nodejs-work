var express = require('express');
var nunjucks = require('nunjucks');
var converter = require("./app/converter");
var config = require('./config')
const axios = require('axios');
const sendGetRequest = async () => {
    try {
        const resp = await axios.get('https://neosample.jfrog.io/artifactory/api/build', {
            headers: {
                'X-JFrog-Art-Api' : 'AKCp8mZT9hVAy6d6vk85xqgW9tVsHFMmcKfhw33kPezDaj5wfTyzirpgxHidWj1C9MmVPkrd6'
            }
        });
        console.log(resp.data);
    } catch (err) {
        console.error(err);
    }
};
sendGetRequest();

var app = express();


var env = nunjucks.configure(['views/'], {
    autoescape: true,
    express: app
})

app.get('/', function (req, res) {
    var data = {
        name: 'Abhay Singh',
        age: 29,
        address: 'Delhi'
    }
    res.send(200, JSON.stringify(data))
})

app.get("/rgbToHex", function (req, res) {

    var red = parseInt(req.query.red, 10);
    var green = parseInt(req.query.green, 10);
    var blue = parseInt(req.query.blue, 10);
    var hex = converter.rgbToHex(red, green, blue);
    res.send(hex);

});

app.get("/hexToRgb", function (req, res) {

    var hex = req.query.hex;
    var rgb = converter.hexToRgb(hex);
    res.send(JSON.stringify(rgb));

});

var port = config.port ?? 4000
app.listen(port, function () {
    console.log('templete app is running on 4000 port')
})
