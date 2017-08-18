var express = require('express');
var parser = require('body-parser');
var mysqldb=require('./mysqldb.js');
var app = express();

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.get('/', function(req, res) {
res.sendfile('main.html');
});


app.get('/ajax', function(req, res) {
   res.sendfile('ajaxmanager.html');
});
app.get('/api/', function(req, res) {
  var callback = function (err, result) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        console.log('json:', result);
        res.end(result);
    };
    mysqldb.searchAllPeople(callback);
});
app.get('/api/person/:id', function(req, res) {
   var callback = function (err, result) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        console.log('json:', result);
        res.end(result);
    };
    mysqldb.searchPersonByID(callback,req.params.id);
});
app.get('/*', function(req, res) {
   res.sendfile(req.params);
});
app.post('/quote', function(req, res) {
  if(!req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('text')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }

  var newQuote = {
    author : req.body.author,
    text : req.body.text
  };

  quotes.push(newQuote);
  res.json(true);
});

app.delete('/quote/:id', function(req, res) {
  if(quotes.length <= req.params.id) {
    res.statusCode = 404;
    return res.send('Error 404: No quote found');
  }

  quotes.splice(req.params.id, 1);
  res.json(true);
});


app.listen(process.env.PORT || 3000);