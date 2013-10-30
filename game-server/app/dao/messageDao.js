/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-10-30
 * Description: messageDao
 */
var redis = require('redis')
    , redisConfig = require('../../../shared/config/redis');

var env = process.env.NODE_ENV || 'development';
if(redisConfig[env]) {
    redisConfig = redisConfig[env];
}

var messageDao = module.exports;

messageDao.init = function() {
    var db = redis.createClient(redisConfig.port, redisConfig.host);

    db.subscribe("pushMessage");

    db.on("message", function(channel, message) {
        console.log(message);
    });
}