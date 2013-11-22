/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-23
 * Description: chatHandler
 */
var chatRemote = require('../remote/chatRemote');
var seaking_server = require('../../../lib/seaking_server/seaking_server');

var SCOPE = {
    PRI: '49237U',
    AREA: 'IVNAS2',
    ALL: 'G23947'
};

module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

var handler = Handler.prototype;

function setContent(str) {
    str = str.replace(/<\/?[^>]*>/g,'');
    str = str.replace(/[ | ]*\n/g,'\n');
    return str.replace(/\n[\s| | ]*\r/g,'\n');
}

/**
 * Send messages to users
 *
 * @param {Object} msg message from client
 * @param {Object} session
 * @param  {Function} next next stemp callback
 *
 */
handler.send = function(msg, session, next) {
    var scope = msg.scope;

    msg.content = setContent(msg.content);

    if(scope == SCOPE.ALL)
        msg.toName = "*";

	var rid = session.get('rid');
	var username = session.uid;
	var channelService = this.app.get('channelService');
    var date = new Date();
	var param = {
		route: 'onChat',
        id: date.getTime(),
        content: msg.content,
		from: username,
        toName: msg.toName,
        scope: scope
	};
	var channel = channelService.getChannel(rid, false);

    var command = [];
    var method = "";
    if(msg.content.indexOf("/command:") == 0) {
        command = msg.content.split(":");
        command = command[1].split("|");
        method = command[0];
        var arguments = command[1].split(",");

        if(typeof seaking_server[method] == "function") {
            seaking_server[method](session, arguments, function(err, reply) {

            });
            next(null, {
                code: 200
            });
            return;
        }
    }

	//the target is all users
	if(scope == SCOPE.ALL) {
		channel.pushMessage(param);
	} else if(scope == SCOPE.AREA) {
        var currentScene = msg.currentScene;
        var uids = [];
        var tsid = "connector-server-1";
        seaking_server.getAreaInfo({
            sceneId: currentScene
        }, function(err, reply) {
            for(var i = 0 ; i < reply.length ; i++) {
                uids.push({
                    uid: reply[i],
                    sid: tsid
                });
            }
            channel.pushMessage(param);
        });
    } else {
		var tuid = msg.toName;
        var tsid = "connector-server-1";
		channelService.pushMessageByUids(param, [{
			uid: tuid,
			sid: tsid
		}]);
	}
	next(null, {
		code: 200
	});
};