module.exports = {
  searchPersonByName: function (callback) {
    return getPersonByName(callback);
  },
  searchPersonByID: function (callback,id) {
   return getPersonByID(callback,id);
  },
   searchAllPeople:function(callback) {
    return getAllPeople(callback);
   }
};



function getPersonByName(callback,name) {
    
    connection.connect();
    var json = '';
    var query = 'SELECT id,name FROM person where name=?';
    connection.query(query,[name], function(err, results, fields) {
        if (err)
            return callback(err, null);
            
        console.log('The query-result is: ', results[0]);

        // wrap result-set as json
        json = JSON.stringify(results);

        connection.end();
        console.log('JSON-result:', json);
        callback(null, json);
    });
};

function getPersonByID(callback,id) {
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
    var query = 'SELECT id,Name,Surname,fotoname as fotourl FROM person where id=?';
    connection.query(query,[id], function(err, results, fields) {
        if (err)
            return callback(err, null);

        console.log('The query-result is: ', results[0]);

        // wrap result-set as json
        json = JSON.stringify(results);

        connection.end();
        console.log('JSON-result:', json);
        callback(null, json);
    });
};
function getAllPeople(callback) {
    connection.connect();
    var json = '';
    var query = 'SELECT id,name FROM person';
    connection.query(query, function(err, results, fields) {
        if (err)
            return callback(err, null);

        console.log('The query-result is: ', results[0]);

        // wrap result-set as json
        json = JSON.stringify(results);

        connection.end();
        console.log('JSON-result:', json);
        callback(null, json);
    });
};