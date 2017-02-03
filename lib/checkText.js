module.exports = function(teamspeakClient, queryinterval, config) {
    var beleidigen = require('./beleidigen.js'),
        	util     = 	require("util");
        (function checkText() {


            teamspeakClient.send("servernotifyregister", {
                event: "textprivate"
            }, function(err, response) {
            });

            teamspeakClient.on("textmessage", function(data) {
                teamspeakClient.send("whoami", function(err, info) {
                    if (info.client_id !== data.invokerid) {
                      console.log("------------------------------------------");
                      console.log(data);
                      var msgArr = data.msg.split(" ");
                      console.log(msgArr[1]);
                      if(data.msg.charAt(0)==="." & msgArr[0]===".beleidigen"){
                        var user = msgArr[1];
                        teamspeakClient.send("clientfind", {
                            pattern: user
                        }, function(err, clientInfo) {
                          console.log(clientInfo);
                          if(err){
                            teamspeakClient.send("sendtextmessage", {
                                targetmode: 1,
                                msg: "Client nicht gefunden!",
                                target: data.invokerid
                            }, function(err, response) {
                                console.log(err);
                            });
                          }else if(util.isArray(clientInfo)){
                            teamspeakClient.send("sendtextmessage", {
                                targetmode: 1,
                                msg: "Welcher Client soll beleidigt werden? "+joinIDs(clientInfo),
                                target: data.invokerid
                            }, function(err, response) {
                                console.log(err);
                            });
                          }else{
                            beleidigen(false, 2, true, function(beleidigung) {
                                console.log("clid: "+ clientInfo.clid);
                                teamspeakClient.send("sendtextmessage", {
                                    targetmode: 1,
                                    msg: beleidigung,
                                    target: clientInfo.clid
                                }, function(err) {
                                    if (err) {
                                      console.log(err);
                                    }else{
                                      teamspeakClient.send("sendtextmessage", {
                                          targetmode: 1,
                                          msg: clientInfo.client_nickname+" erfolgreich mit \""+beleidigung+"\" beleidigt",
                                          target: data.invokerid
                                      }, function(err, response) {
                                          console.log(err);
                                      });
                                    }
                                });
                            });
                          }
                        });
                    }
                  }
                });

            });





        })();

};

function joinIDs(arr){
  var clientList = [];
  for (var n in arr){
    console.log(arr[n]);
    clientList.push(arr[n].client_nickname);
  }
  return clientList.join(" oder ");
}
