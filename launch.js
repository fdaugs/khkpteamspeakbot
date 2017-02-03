var fs = require('fs')
    , mkdirp = require('mkdirp')
    , path = require('path')
    , async = require('async')
    , crypto = require('crypto')
    , keepAlive = require('./lib/keepalive.js').main
    , launchTeamspeak = require('./lib/launchteamspeak.js')
    , queryUsers = require('./lib/queryusers.js')
    , checkHome = require('./lib/checkHomeChannel.js')
    , checkText = require('./lib/checkText.js')
    , follow = require('./lib/follow.js')
    , app = require('./router.js') ;

loadConfig();

function loadConfig(callback) {
    //  Read config.json and initialize client.
    try {
        var configjson = fs.readFile("config.json", (err, data) => {
            //console.log(data.toString('utf8'));
            var configjson = JSON.parse(data);
            startUp(null, configjson);
        });
    }
    catch (err) {}
}

function startUp(err, results) {
    var configmain = results.main;
    var configcheckHome = results.checkHome;
    var settings = results.settings;
    launchTeamspeak(configmain, function (err, results) {
        //  var config is already in bigger scope.
        //  results = teamspeakClient

        if (err !== null) {
            console.log(results);
            process.exit();
        }

        var teamspeakClient = results;
        var teamspeakStatus = true;
        /*keepAlive(teamspeakClient, teamspeakStatus, configmain);
        checkHome(teamspeakClient, configmain.queryinterval,configcheckHome);
        checkText(teamspeakClient, configmain.queryinterval,configcheckHome);
        follow(teamspeakClient, configmain.queryinterval,settings);*/
        app(teamspeakClient, teamspeakStatus, configmain);
    });
}
