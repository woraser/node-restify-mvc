/**
 * Created by chenhui on 16/1/26.
 */
// redis client
var redisClient = module.exports;

var _redis = null;

var OBJ = {};


/*
 * Innit sql connection pool
 * [@param](/user/param) {Object} app The app for the server.
 */
OBJ.init = function(){
    if(!_redis)
        _redis = require('./redisConnect').createRedisServer();
};

/**
 * Close redis.
 */
OBJ.close = function(){
    _redis.end();
};

/**
 * init database
 */
redisClient.init = function() {
    if (!!_redis){
        return redisClient;
    } else {
        OBJ.init();
        //sqlclient.update = NND.query;
        ////sqlclient.delete = NND.query;
        //redisClient.getValue = OBJ.getValue;
        return redisClient;
    }
};

redisClient.checkReady = function(){
    _redis.on('on',function(res){
        console.log('redis has reday');
    });

}

/**
 * set key:Value
 */
redisClient.set = function(key,value){
    _redis.set(key,value,_redis.print);
};

/**
 * get key:Value
 */
redisClient.get = function(key,callback){
    _redis.get(key,function(err, value){
        callback.apply(null, [err, value]);
    })
};


/**
 * close the redis connect
 */
redisClient.close = function() {
    OBJ.close();
};

//
//client.set('chenhui','huichen',redis.print);
//client.set('string key', 'string val', redis.print);
//client.hset('hash key', 'hashtest 1', 'some value', redis.print);
//client.hset(['hash key', 'hashtest 2', 'some other value'], redis.print);
//client.hkeys('hash key', function (err, replies) {
//    if (err) {
//        return console.error('error response - ' + err);
//    }
//
//    console.log(replies.length + ' replies:');
//    replies.forEach(function (reply, i) {
//        console.log('    ' + i + ': ' + reply);
//    });
//});
//
////client.get("string key", function(err, reply) {
////    // reply is null when the key is missing
////    console.log(reply);
////});
//
//client.quit(function (err, res) {
//    console.log('Exiting from quit command.');
//});