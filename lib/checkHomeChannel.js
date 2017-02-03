/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
module.exports = function(teamspeakClient, queryinterval,config) {
    var homeChannelTimes = {};
    var maxHomeChannelTimes = config.idleTime / 2;
    (function checkHomeChannel() {
        teamspeakClient.send("clientlist", function(err, response) {
            if (!response) {
                response = [];
            } else if (!Array.isArray(response)) {
                response = [response];
            }
            var newHomeChannelTimes = {};
            for (i in response) {
                var client = response[i];
                if (client.client_type === 0) {
                    if (client.cid === config.homechannelid) {
                        var homeChannelTime = homeChannelTimes[client.client_database_id] ? homeChannelTimes[client.client_database_id] + 1 : 1;
                        if (homeChannelTime > maxHomeChannelTimes) {
                            teamspeakClient.send("clientpoke", {clid: client.clid, msg: config.movemsg});
                            teamspeakClient.send("clientmove", {clid: client.clid, cid: config.movetochannelid});
                        } else {
                            newHomeChannelTimes[client.client_database_id] = homeChannelTime;
                        }
                    }
                }
            }
            homeChannelTimes = newHomeChannelTimes;
            setTimeout(function() {
                checkHomeChannel();
            }, queryinterval);
        });
    })();
};
