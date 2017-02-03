function Reply(teamspeakClient, scope, replyTo) {
    this.replyTo = replyTo;
    this.teamspeakClient = teamspeakClient;
    this.scope = scope;
}

Reply.prototype.send = function(msg){
var replyTo = this.replyTo;
var scope = this.scope;
var teamspeakClient = this. teamspeakClient;

teamspeakClient.send("sendtextmessage", {
    targetmode: scope,
    msg: msg,
    target: replyTo
}, function(err, response) {
    console.log(err);
});

};


module.exports = Reply;
