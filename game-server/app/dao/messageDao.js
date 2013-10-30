/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-10-30
 * Description: messageDao
 */
var redis = require('redis')
    , redisConfig = require('../../../shared/config/redis')
    , consts = require('../consts/consts');

var env = process.env.NODE_ENV || 'development';
if(redisConfig[env]) {
    redisConfig = redisConfig[env];
}

var SCOPE = {
    PRI: '49237U',
    AREA: 'IVNAS2',
    ALL: 'G23947'
};

function setContent(str) {
    str = str.replace(/<\/?[^>]*>/g,'');
    str = str.replace(/[ | ]*\n/g,'\n');
    return str.replace(/\n[\s| | ]*\r/g,'\n');
}

var messageDao = module.exports;

messageDao.init = function(app) {
    var db = redis.createClient(redisConfig.port, redisConfig.host);

    db.subscribe("pushMessage");

    db.on("message", function(channel, message) {
        message = JSON.parse(message);
        var param = {
            route: 'onChat',
            content: setContent(message.message),
            from: "",
            toName: "*",
            scope: SCOPE.ALL
        };
        var channelService = app.get('channelService');
        var channel = channelService.getChannel(consts.rid, false);
        channel.pushMessage(param);
    });

    return db;
}