var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = 5000;

http.listen(port, (err) => {
    console.log(err ? err : `Server is listening on port ${port}...`);
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  //var toEmit = '<i>Nouvel utilisateur connecté</i>';
  //io.emit('message', toEmit);
  console.log('Nouvel utilisateur connecté');

  socket.on('disconnect', function (data) {
    //var toEmit = '<i>Un utilisateur s\'est déconnecté</i>';
    //io.emit('message', toEmit);
    console.log('Un utilisateur s\'est déconnecté');
  });

  socket.on('message', function(message) {
    //var toEmit = '<b>' + message.username + ' :</b> ' + message.message;
    //io.emit('message', toEmit);
  });

  socket.on('change username', function(username) {
    //var toEmit = '<i>"' + username.old + '" a changé son nom en "' + username.new + '"</i>';
    //io.emit('message', toEmit);
  });
});
