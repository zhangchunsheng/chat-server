/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-10-08
 * Description: testGetAreaInfo
 */
var seaking_server = require('../app/lib/seaking_server/seaking_server');

seaking_server.getAreaInfo({
    sceneId: "city01"
}, function(err, reply) {
    console.log(reply);
});