var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = 5000;

app.listen(port, (err) => {
    console.log(err ? err : `Server is listening on port ${port}...`);
});
