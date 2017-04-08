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
  console.log('Nouvel utilisateur connecté');
  socket.on('disconnect', function (data) {
    console.log('Un utilisateur s\'est déconnecté');
  });

  socket.on('message', function(message) {
    //io.emit('message', message);
  });
});
