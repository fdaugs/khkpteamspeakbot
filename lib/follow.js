module.exports = function(teamspeakClient, queryinterval, settings) {
        (function follow() {


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
