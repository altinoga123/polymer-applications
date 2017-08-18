// Check dependencies
var http = require('http');
// Create the http server.
// reference: http://net.tutsplus.com/tutorials/javascript-ajax/node-js-for-beginners/

var http = require('http');

http.createServer(function(req, res) {
  var headers = req.headers;
  var method = req.method;
  var url = req.url;
  var body = [];
  console.log('Receving request...');
  req.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    var callback = function (err, result) {
        var result = 'result: request:' + req + ', request.method:' + req.method + ', request.url' + req.url;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        console.log('json:', result);
        res.end(result);
    };
    getPersonName(callback);
    // At this point, we have the headers, method, url and body, and can now
    // do whatever we need to in order to respond to this request.
  });
}).listen(3000);
/* http.createServer(function(req, res) {
    console.log('Receving request...');
    var callback = function(err, result) {
		var result='result: request:' + req + ', request.method:' +req.method+', request.url'+req.url;
        res.writeHead(200, {
            'Content-Type' : 'text/plain'
        });
        console.log('json:', result);
        res.end(result);
    };

    getSQL(callback);

}).listen(3000); */

// Access MySQL via node-mysql
// https://github.com/felixge/node-mysql
function getSQL(callback) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host : 'localhost',
		port:'3306',
        user : 'root',
        password : 'Admin123',
        database : 'test',
        //socketPath : '/var/run/mysqld/mysqld.sock', // socket for communication from debian <-> client, seems not to be set correcly by default?
    });

    connection.connect();
    var json = '';
    var query = 'SELECT * FROM person';
    connection.query(query, function(err, results, fields) {
        if (err)
            return callback(err, null);

        console.log('The query-result is: ', results[0]);

        // wrap result-set as json
        json = JSON.stringify(results);

        /***************
        * Correction 2: Nest the callback correctly!
        ***************/
        connection.end();
        console.log('JSON-result:', json);
        callback(null, json);
    });
};

function getPersonName(callback) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host : 'localhost',
		port:'3306',
        user : 'root',
        password : 'Admin123',
        database : 'test',
        //socketPath : '/var/run/mysqld/mysqld.sock', // socket for communication from debian <-> client, seems not to be set correcly by default?
    });

    connection.connect();
    var json = '';
    var query = 'SELECT name FROM person';
    connection.query(query, function(err, results, fields) {
        if (err)
            return callback(err, null);

        console.log('The query-result is: ', results[0]);

        // wrap result-set as json
        json = JSON.stringify(results);

        /***************
        * Correction 2: Nest the callback correctly!
        ***************/
        connection.end();
        console.log('JSON-result:', json);
        callback(null, json);
    });
};