/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-17
 * Description: ucenter
 */
var serverConfig = require('../../../../shared/config/seaking_server');
var httpHelper = require('../http/httpHelper');

var env = process.env.NODE_ENV || 'development';
if(serverConfig[env]) {
    serverConfig = serverConfig[env];
}

var seaking_server = module.exports;

seaking_server.getAreaInfo = function(data, cb) {
    var host = serverConfig.host;
    var port = serverConfig.port;
    var path = "/area/getAreaInfo";
    var headers = {};

    httpHelper.get(host, port, path, headers, data, cb);
}

/**
 *
 * @param session
 * @param arguments
 * @param next
 */
seaking_server.resetTask = function(session, arguments, next) {
    var nickname = session.uid;
    var type = arguments[0];
    var taskId = arguments[1] || "";

    var host = serverConfig.host;
    var port = serverConfig.port;
    var path = "/gm/resetTask";
    var headers = {};

    var data = {
        nickname: nickname,
        type: type,
        taskId: taskId
    };

    httpHelper.get(host, port, path, headers, data, next);
}

/**
 *
 * @param session
 * @param arguments
 * @param next
 */
seaking_server.updateMoney = function(session, arguments, next) {
    var nickname = session.uid;
    var money = arguments[0];

    var host = serverConfig.host;
    var port = serverConfig.port;
    var path = "/gm/updateMoney";
    var headers = {};

    var data = {
        nickname: nickname,
        money: money
    };

    httpHelper.get(host, port, path, headers, data, next);
}

/**
 *
 * @param session
 * @param arguments
 * @param next
 */
seaking_server.updateExp = function(session, arguments, next) {
    var nickname = session.uid;
    var exp = arguments[0];

    var host = serverConfig.host;
    var port = serverConfig.port;
    var path = "/gm/updateExp";
    var headers = {};

    var data = {
        nickname: nickname,
        exp: exp
    };

    httpHelper.get(host, port, path, headers, data, next);
}

/**
 * updateLevel
 * @param session
 * @param arguments
 * @param next
 */
seaking_server.updateLevel = function(session, arguments, next) {
    var nickname = session.uid;
    var exp = arguments[0];

    var host = serverConfig.host;
    var port = serverConfig.port;
    var path = "/gm/updateLevel";
    var headers = {};

    var data = {
        nickname: nickname,
        exp: exp
    };

    httpHelper.get(host, port, path, headers, data, next);
}