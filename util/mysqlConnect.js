
var mysql = require('mysql');

var env = process.env.NODE_ENV || 'development';

exports.createMysqlPool= module.exports.createMysqlPool = function(){
  return mysql.createPool({
      connectionLimit : 100,
      host     : '127.0.0.1',
      user     : 'root',
      password : '',
      port: '3306',
      database: 'test'
  });
}