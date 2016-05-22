/*
 * @Title:mysql demo
 * @Author:Charles.chen
 * @Date:2016-05-22 21:45
 */
var mysqlClient = require('../util/mySqlClient').init();
//var redisClient = require('../util/redisClient').init();
/*
 * routing
 */
var Hello = function(){};
var hello = new Hello();

//setting routing
module.exports.route = function(app) {
    app.get('/hello/sayHello/:name', hello.sayHello);
    app.get('/hello/queryAll', hello.queryAll);
    app.post('/hello', hello.insertData);
    app.post('/hello/queryPost', hello.queryPost);
    app.put('/hello/:id', hello.updateData);
    app.del('/hello/:id', hello.delete);
};

/**
 * controller
 * req.params url->params
 * req.body request body->params
 * next next function
 * req request
 * res response
 * result is string. if you want Object,you can change it with JSON.parse("{}")
 *
**/

/**
 * Notice that they use SET instead of VALUES.
 * INSERT INTO ... SET x = y is a valid MySQL query,
 * while INSERT INTO ... VALUES x = y is not.
 * http://stackoverflow.com/questions/21779528/insert-into-fails-with-node-mysql
 * response:{
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 3306,
    "serverStatus": 2,
    "warningCount": 0,
    "message": "",
    "protocol41": true,
    "changedRows": 0
}
 **/
Hello.prototype.insertData = function(req, res, next){
    //var post = {
    //    id:req.body.id,
    //    email:req.body.email,
    //    name:req.body.name};
    //    JSON.stringify(req.body)
    var sql = "insert into users set ?";
    mysqlClient.query(sql,req.body,function(err, result){
        res.send(result);
    });
    return next();
};

/**
 * Notice that the data in sql for update can be used like [{req.body},req.param.id]
 * 'update users set ? where id = ?'=>[{name:'',password:""},id]
 * while INSERT INTO ... VALUES x = y is not.
 * http://stackoverflow.com/questions/14992879/node-js-mysql-query-syntax-issues-update-where
 * response:{
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "serverStatus": 2,
    "warningCount": 0,
    "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
    "protocol41": true,
    "changedRows": 1
}
 **/
Hello.prototype.updateData = function(req, res, next){

    var data = [req.body,req.params.id];
    var sql = 'update users set ? where id = ?';
    mysqlClient.query(sql,data,function(err, result){
        res.send(result);
    });

    return next();
};

Hello.prototype.queryPost = function(req, res, next){

    var sql = "select * from users where ?";
    mysqlClient.query(sql,req.body,function(err, result){
        res.send(result);
    });
    return next();
};


Hello.prototype.queryAll = function(req, res, next){

    var sql = "select * from users";
    mysqlClient.query(sql,function(err, result){
        res.send(result);
    });
    return next();
};

/**
 * delete data use id
 response:{
     "fieldCount": 0,
     "affectedRows": 1,
     "insertId": 0,
     "serverStatus": 2,
     "warningCount": 0,
     "message": "",
     "protocol41": true,
     "changedRows": 0
 }
 **/
Hello.prototype.delete = function(req, res, next){

    var id = req.params.id;
    var sql = "delete from users where id = ?";
    mysqlClient.query(sql,id,function(err, result){
        res.send(result);
    });
    return next();
};

Hello.prototype.sayHello = function(req, res, next){

    res.send(req.params);
    return next();
};

//Hello.prototype.sayHello = function(req, res, next){
//
//  redisClient.set('keyA','valueA',redisClient.print);
//   redisClient.get('keyA',function(err,results){
//      if (err) return next(err);
//      res.send(results);
//  });
//  return next();
//};
