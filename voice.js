/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

var fs = require("fs");

// var apiai = require("../module/apiai");
var apiai = require("apiai");

var uuid = require("uuid");





var sessionId = uuid.v1();
var options = {
  sessionId:sessionId
};
var app = apiai("f1a5a9e3c4fd44cca06e976f79100402", {
    language: 'de-DE'
});

var request = app.voiceRequest();

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

fs.readFile("req.wav", function(error, buffer) {
    if (error) {
        console.log(error);
    } else {
        request.write(buffer);
    }

    request.end();
});
