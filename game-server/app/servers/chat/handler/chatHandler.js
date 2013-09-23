/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-23
 * Description: chatHandler
 */
var chatRemote = require('../remote/chatRemote');
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
    var currentScene = msg.currentScene;
    if(scope == SCOPE.ALL)
        msg.toName = "*";

	var rid = session.get('rid');
	var username = session.uid;
	var channelService = this.app.get('channelService');
	var param = {
		route: 'onChat',
        content: msg.content,
		from: username,
        toName: msg.toName,
        scope: scope
	};
	var channel = channelService.getChannel(rid, false);

	//the target is all users
	if(scope == SCOPE.ALL) {
		channel.pushMessage(param);
	} else if(scope == SCOPE.AREA) {
        channel.pushMessage(param);
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