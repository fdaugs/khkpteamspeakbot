/*module.exports = {
  event: function(){},

  command: function(teamspeakClient, command, callback){
    teamspeakClient.send("servernotifyregister", {
        event: "textprivate"
    }, function(err, response) {
    });

    teamspeakClient.on("textmessage", function(data) {
        teamspeakClient.send("whoami", function(err, info) {
            if (info.client_id !== data.invokerid) {
              var msgArr = data.msg.split(" ");
              if(data.msg.charAt(0)==="." & msgArr[0]==="."+command){
                callback(msgArr);
              }
          }
        });
      });
  },

};
*/
var Reply = require("./reply");
var ReplyChannel = require("./replyChannel");
//module.js
function Tsbot(teamspeakClient) {
    this.teamspeakClient = teamspeakClient;
}

Tsbot.prototype.command = function(command, callback) {
    var teamspeakClient = this.teamspeakClient;
    teamspeakClient.send("servernotifyregister", {
        event: "textprivate"
    }, function(err, response) {});

    teamspeakClient.on("textmessage", function(data) {
        teamspeakClient.send("whoami", function(err, info) {
            if (info.client_id !== data.invokerid) {
                var msgArr = data.msg.split(" ");
                if (msgArr[0] === "." + command) {
                    var params = [];
                    console.log(data);
                    params.data=msgArr;
                    params.uid=data.invokeruid;
                    var reply = new Reply(teamspeakClient,1, data.invokerid );
                    callback(params,reply);
                }
            }
        });
    });
};



Tsbot.prototype.natural = function(callback) {
    var teamspeakClient = this.teamspeakClient;
    teamspeakClient.send("servernotifyregister", {
        event: "textchannel"
    }, function(err, response) {});

    teamspeakClient.on("textmessage", function(data) {
        teamspeakClient.send("whoami", function(err, info) {
            if (info.client_id !== data.invokerid) {
                var reply = new ReplyChannel(teamspeakClient,2);
                    console.log(data.msg);
                    callback(data.msg,reply);
                }
        });
    });
};

Tsbot.prototype.moved=function(callback){
  var teamspeakClient = this.teamspeakClient;
  teamspeakClient.send("servernotifyregister", {
      event: "channel",
      id:0
  }, function(err, response) {
  });

  teamspeakClient.on("clientmoved", function(data) {
    callback(data);
  });
};

Tsbot.prototype.getGroups=function(uid, callback){
  console.log("uid:"+uid);
  var teamspeakClient = this.teamspeakClient;
  teamspeakClient.send("clientdbfind", {
      pattern: "sHzVNT8nNp4x3i+4/OiCmvVAoxA=",
  },"-uid", function(err, response) {
    console.log(err);
  teamspeakClient.send("servergroupsbyclientid", {
      cldbid: response.cldbid,
  }, function(err, response) {
    console.log(err);
    callback(response);
  });
  });
};

module.exports = Tsbot;
