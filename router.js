module.exports = function(teamspeakClient, teamspeakStatus, config) {
var Bot = require("./lib/ts-bot"),
    flame = require("./lib/ts-bot"),
    apiai = require("apiai"),
    fs = require("fs"),
    uuid = require("uuid");

var bot = new Bot(teamspeakClient);

var app = apiai("f1a5a9e3c4fd44cca06e976f79100402");

var sessionId = uuid.v1();
var options = {
  sessionId:sessionId
};



bot.natural(function(msg, reply){
  /*bot.getGroups(params.uid,function(groups){
    console.log(groups);
  });*/

  var request = app.textRequest(msg, options);

  request.on('response', function(response) {
      reply.send(response.result.fulfillment.speech);
  });

  request.on('error', function(error) {
      console.log(error);
  });

  request.end();

});

bot.command("hallo",function(params, reply){
  console.log(params);
  reply.send("Ok");
});

bot.moved(function(data){
  console.log(data);
});





/*bot.event("clientmoved",function(params){
  sendPvt(23,"Hallo");
  sendCh("Ok");
  sendServer("Ok");
  getBotID();
  getOwnerID();
  mvClient(clid,ctid);
  kickClient(clid,scope);
  banClient(clid,time);
});*/

};
