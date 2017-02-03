/*module.exports = {
  fowllow: function(){},
  unfollow: function(){}
};*/
var fowllow = false;

var Following = function(teamspeakClient, queryinterval, settings){
  this.teamspeakClient = teamspeakClient;
  this.queryinterval   = queryinterval;
  this.config          = config;
};

MyModule.prototype.follow = function(){
  teamspeakClient.send("servernotifyregister", {
      event: "channel",
      id:0
  }, function(err, response) {
  });

  teamspeakClient.on("clientmoved", function(data) {
    if (settings.follow) {
      console.log(data);
      teamspeakClient.send("whoami", function(err, info) {
        teamspeakClient.send("clientgetids",{cluid:"sHzVNT8nNp4x3i+4/OiCmvVAoxA="}, function(err,uidInfo) {
          console.log(uidInfo);
          var ownerID;
          var bot_ID;
          for(var user in uidInfo){
            if(uidInfo[user].clid!==info.client_id){
              ownerID=uidInfo[user].clid;
              console.log("owner: "+uidInfo[user].clid);
            }else{
              bot_ID=uidInfo[user].clid;
              console.log("bot: "+uidInfo[user].clid);
            }
          }
          if(data.clid===ownerID){
            teamspeakClient.send("clientmove",{clid:bot_ID,cid:data.ctid}, function(err) {
              console.log(err);
            });
          }
        });
      });
    }
  });
};

MyModule.prototype.unfollow = function(){

};

module.exports = Following;
