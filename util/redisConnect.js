
var redis = require('redis'),
    REDIS_PORT = '6379',
    REDIS_HOST = '127.0.0.1',
    REDIS_OPTS ={};
var env = process.env.NODE_ENV || 'development';

exports.createRedisServer= module.exports.createRedisServer = function(){

  var client = redis.createClient(REDIS_PORT,REDIS_HOST);

  return client;
}